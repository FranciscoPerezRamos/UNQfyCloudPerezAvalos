
const rp = require('request-promise'); 
const express = require('express');
const app = express();
const router = express.Router();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const apiError = require('./apiError');

const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('./unqfy');

// Retorna una instancia de UNQfy. Si existe filename, recupera la instancia desde el archivo.
function getUNQfy(filename) {
  let unqfy = new unqmod.UNQfy();
  if (fs.existsSync(filename)) {
    console.log();
    unqfy = unqmod.UNQfy.load(filename);
  }
  return unqfy;
}

// Guarda el estado de UNQfy en filename
function saveUNQfy(unqfy, filename) {
  console.log();
  unqfy.save(filename);
}

// Error handler

function errorHandler(err, req, res, next) {
  console.error(err.name); // imprimimos el error en consola
  // Chequeamos que tipo de error es y actuamos en consecuencia
  if (err instanceof apiError.ApiError){
    res.status(err.status);
    res.json({status: err.status, errorCode: err.errorCode});
  } else if (err.type === 'entity.parse.failed'){
  // body-parser error para JSON invalido
    res.status(err.status);
    res.json({status: err.status, errorCode: 'BAD_REQUEST'});
  } else {
  // continua con el manejador de errores por defecto
    next(err);
    }
  }

//


router.use(function(req,res,next){
    console.log('Request received');
    next();
})


app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

app.use('/api', router);


//#region Artists
router.route('/artists').post((req,res,next) => { 

    const unqfy = getUNQfy('unqfy.txt');
    unqfy.addArtist({name :req.body.name,country: req.body.country})
    saveUNQfy(unqfy,'unqfy.txt');
    res.json(unqfy.getArtistByName(req.body.name));
  
  })



router.route('/artists/:id').get((req, res) => { 

    const unqfy = getUNQfy('unqfy.txt');
    
    res.json(unqfy.getArtistById(parseInt(req.params.id)));
    
    })
    
    
router.route('/artists/:id').delete((req, res) => {
  
  const unqfy = getUNQfy('unqfy.txt');

  unqfy.deleteArtistById(parseInt(req.params.id));
  saveUNQfy(unqfy,'unqfy.txt');
  res.end();
})


router.route('/artists').get((req, res) => { 

  const unqfy = getUNQfy('unqfy.txt');
  
  if(req.query.name === undefined){
    res.json(unqfy.getArtists());
  }
  else{
    res.json(unqfy.getArtistsMatchingParcialName(req.query.name));
  }

})
//#endregion Artists

//#region Albums
router.route('/albums').post((req, res) => {
  
  const unqfy = getUNQfy('unqfy.txt');

  unqfy.addAlbumById(req.body.artistId, {name: req.body.name, year: req.body.year});

  saveUNQfy(unqfy, 'unqfy.txt')

  res.json(unqfy.getAlbumByName(req.body.name));

})

router.route('/albums/:id').get((req, res) => {
  
  const unqfy = getUNQfy('unqfy.txt');

  res.json(unqfy.getAlbumById(parseInt(req.params.id)));
})

router.route('/albums/:id').delete((req, res) => {

  const unqfy = getUNQfy('unqfy.txt');

  unqfy.deleteAlbum(parseInt(req.params.id));
  saveUNQfy(unqfy, 'unqfy.txt')
  res.end();
  
})

router.route('/albums').get((req, res) => {

  const unqfy = getUNQfy('unqfy.txt');

  if(req.query.name === undefined){
    res.json(unqfy.getAllAlbums());
  }else{
    res.json(unqfy.getAlbumsMatchingParcialName(req.query.name));
  }
})

app.all('*', (req, res, next) => {
  next(new apiError.InvalidURL());
});

  app.use(errorHandler);

//#endregion Albums

app.listen(port);
console.log('El servicio de UNQfy se encuentra funcionando en el puerto: ' + port);



