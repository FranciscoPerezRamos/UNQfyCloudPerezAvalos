const rp = require('request-promise');

class YouTubeAPI {

  constructor(){
    this.my_api_key_yt = "AIzaSyBnUvAMoxy4lhvuUun2VG4-NBHl9GZWcuQ";
    this.baseURL = 'https://www.googleapis.com/youtube/v3/search';
  }

    getVideoInfoFromYT(paramToSerch){
      
      const options = {
        url: this.baseURL,
        json: true,
        qs: {
          part: 'snippet',
          maxResults : 1,
          order : 'viewCount',
          q : paramToSerch,
          key : this.my_api_key_yt
        },
      };
      return rp(options).then(response => { 
        const item = response.items[0];
        return {
          title: item.snippet.title,
          url: this.getUrlForIdVideo(item.id.videoId)
        };
      });
    }
  
    getUrlForIdVideo(idVideo){
        return "https://youtube.com/watch?v=" + idVideo;
    }

}

/*
const yt = new YouTubeAPI();

yt.getVideoInfoFromYT("californication").then(res => console.log(res));
*/

module.exports = {
  YouTubeAPI,
};