
const rp = require('request-promise'); 
const express = require('express');
const app = express();
const router = express.Router();
const port = process.env.PORT || 5001;
const bodyParser = require('body-parser');
const apiError = require('./apiError');

const fs = require('fs'); // necesitado para guardar/cargar unqfy
const notificationServiceMod = require('./notificationService');

let notificationService = new notificationServiceMod.NotificationService();

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

const BASE_URL = 'http://localhost:5000/api'

function existingArtist(artistId){
  const options = {
      url: `${BASE_URL}/artists/${artistId}`,
      json: true,
  };
  return rp.get(options)
  .then((response) => {
      return true;
  }).catch(err => {
      return false;
  });
}

// Suscribir un email a un artista
router.route('/suscribe').post((req,res,next) => { 

    artistId = req.body.artistId;
    email = req.body.email;

    existingArtist(artistId).then(responde => {
      if(responde){
        notificationService.suscribe(artistId, email)
        res.end();
      }else{
          next(new apiError.NotExistingArtist());
      }
    });

})

// Desuscribir un email a un artista
router.route('/unsuscribe').post((req,res,next) => { 

  artistId = req.body.artistId;
  email = req.body.email;

  existingArtist(artistId).then(responde => {
    if(responde){    
      notificationService.unsuscribe(artistId, email)
      res.end();
    }else{
        next(new apiError.NotExistingArtist());
    }
  });


})

//Notificar a los usuarios suscritos al feed
router.route('/notify').post((req,res,next) => { 

  artistId = req.body.artistId;
  subjet = req.body.subjet;
  message = req.body.message;
  from = req.body.from;
  existingArtist(artistId).then(responde => {
    if(responde){    
      notificationService.notify(artistId, subjet, message, from)
      res.end();   
    }else{
        next(new apiError.NotExistingArtist());
    }
  });
})

router.route('/suscriptions/:id').get((req,res,next) => { 

  const artistId = req.params.id;
  
  existingArtist(artistId).then(responde => {
    if(responde){
      suscriptions = notificationService.suscriptions(artistId)
      res.json({
        "artistId": artistId,
        "suscriptions": suscriptions,
        });    
    }else{
        next(new apiError.NotExistingArtist());
    }
  });
  
})

router.route('/suscriptions/:id').delete((req,res,next) => { 

  artistId = req.params.id;

  existingArtist(artistId).then(responde => {
    if(responde){    
      notificationService.deleteSuscriptions(artistId)
      res.end();   
    }else{
        next(new apiError.NotExistingArtist());
    }
  });
  
})  

app.all('*', (req, res, next) => {
  next(new apiError.InvalidURL());
});

  app.use(errorHandler);

app.listen(port);
console.log('El servicio de notificaciones se encuentra funcionando en el puerto: ' + port);