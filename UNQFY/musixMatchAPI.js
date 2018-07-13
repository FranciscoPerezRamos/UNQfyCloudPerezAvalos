const rp = require('request-promise');

class MusixMatchAPI{

    constructor(){
        this.apikey = '0c09e6e399390218c7d8b382e1d92aba';
        this.baseURL = 'http://api.musixmatch.com/ws/1.1';
    }

    getLyricsMusixMatch(trackiID){
        const options = {
          uri: this.baseURL + `/track.lyrics.get?track_id=${trackiID}`,
          qs: {
            apikey: this.apikey,
          },
          json: true 
        };
        return rp.get(options).then((response) => {
          const header = response.message.header;
          const lyrics = response.message.body.lyrics.lyrics_body;
          console.log(lyrics);
          if (header.status_code !== 200){
            console.log('algo salio mal', response);
            return;
          }
          return lyrics;
        }).catch((error) => {
          console.log('algo salio mal', error);
        });
      }
    
      getTrackIDMusixMatch(name){
        const options = {
          uri: this.baseURL + '/track.search',
          qs: {
            apikey: this.apikey,
            q_track: name,
          },
          json: true 
        };
        return rp.get(options).then((response) => {
          const header = response.message.header;
          const id = response.message.body.track_list[0].track.track_id;
          console.log(id);
          if (header.status_code !== 200){
            console.log('algo salio mal', response);
            return;
          }
          return id;
        }).catch((error) => {
          console.log('algo salio mal', error);
        });
      }

}

module.exports = {
    MusixMatchAPI,
}