

const express = require('express');
const app = express();
const router = express.Router();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

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



router.use(function(req,res,next){
    console.log('Request received');
    next();
})


app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());


app.use('/api', router);

router.route('/artists').post((req,res) => { 

    const unqfy = getUNQfy('unqfy.txt');
  
    unqfy.addArtist({name :req.body.name,country: req.body.country});
  
    saveUNQfy(unqfy,'unqfy.txt');
  
    res.json(unqfy.getArtistByName(req.body.name));
  
  })


router.route('/artists/:id').get((req, res) => { 

    const unqfy = getUNQfy('unqfy.txt');
    
    res.json(unqfy.getArtistById(parseInt(req.params.id)));
    
    })
    
    
router.route('/artist/:id').delete((req, res) => {
  
  const unqfy = getUNQfy('unqfy.txt');

  const artist = unqfy.getArtistById(parseInt(req.params.id));

  if(artist === null){
    res.json({
      statusCode: '404',
      message: 'Error_artist_not_found'
    })
  }
  else{
    unqfy.deleteArtist(artist);
    saveUNQfy(unqfy,'unqfy.txt');
  }



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




app.listen(port);
console.log('Magic happens on port ' + port);



