const rp = require('request-promise');

const key = '0c09e6e399390218c7d8b382e1d92aba';

//request track.search = http://api.musixmatch.com/ws/1.1/track.search?q_track=bhoemian

//request track.lyrics.get = track.lyrics.get?track_id=UN_ID
const trackiID = 3385181;
const BASE_URL = 'http://api.musixmatch.com/ws/1.1';
let options = {
  uri: BASE_URL + `/track.lyrics.get?track_id=${trackiID}`,
  qs: {
    apikey: '0c09e6e399390218c7d8b382e1d92aba',
  },
  json: true // Automatically parses the JSON string in the response
};
rp.get(options).then((response) => {
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
