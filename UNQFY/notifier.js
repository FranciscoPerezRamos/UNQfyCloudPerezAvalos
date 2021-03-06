const rp = require('request-promise');
const observablemod = require('./observer')

class Notifier {

    change(artist, params){

        switch(params.change){
            case 'addAlbum':
                const addOptions = {
                    //url: 'http://localhost:5001/api/notify',
                    url: 'http://172.20.0.22:5001/api/notify',
                    body: {
                        "artistId": artist.id,
                        "subjet": `Nuevo album para artista ${artist.name}`,
                        "message": `Se ha agregado el album ${params.album.name} al artista ${artist.name}`,
                        "from": '"UNQFY" lospibes.unqfy.notifier@gmail.com',
                    },
                    json: true,
                };
                rp.post(addOptions);              
                break;

            case 'deleteArtist':
                const options = {
                    //url: `http://localhost:5001/api/suscriptions/${artist.id}`,
                    url: `http://172.20.0.22:5001/api/suscriptions/${artist.id}`,
                    json: true,
                };
                rp.delete(options);
        }
    }

}



module.exports = {
    Notifier,
  };