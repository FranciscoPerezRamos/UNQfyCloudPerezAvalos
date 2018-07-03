const rp = require('request-promise');

class Observer{

    change(artist, album, change){

        switch(change){
            case 'addAlbum':
                const options = {
                    url: 'http://localhost:5001/api/notify',
                    body: {
                        "artistId": artist.id,
                        "subjet": `Nuevo album para artista ${artist.name}`,
                        "message": `Se ha agregado el album ${album.name} al artista ${artist.name}`,
                        "from": "UNQFY lospibes.unqfy.notifier@gmail.com"
                    },
                    json: true,
                };
                rp.post(options);              
            
        }
    }

}

module.exports = {
    Observer, 
  };