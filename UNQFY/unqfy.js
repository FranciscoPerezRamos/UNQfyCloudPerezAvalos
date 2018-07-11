const picklejs = require('picklejs');
const rp = require('request-promise');
const apiError = require('./apiError');
const notifierMod = require('./notifier')
const token = 'BQAUrW7tzi0MtGyCTfyGM3DP5mP3nf0eplDqREoClfazvE5KwK1UxGwWONNubxcuoIeqMLT3rDdePPFeDcwFziP7JK57YoCtQv9r2dvupDBIz6W0_PbOW8aP8gd_43l8ply5Nv2jjn8MSYnGER9IPlrIsS-ko5gNhY-dGFWDyORKaa3QkQ';
const ytMod = require('./youtubeAPI.js');
const mmMod = require('./musixMatchAPI.js');

const ytAPI = new ytMod.YouTubeAPI();
const mmAPI = new mmMod.MusixMatchAPI();

const notifier = new notifierMod.Notifier();

class Artist{

  constructor(id, name, country){
    this.id = id;
    this.name = name;
    this.albums = new Array();
    this.country = country;
  }

  addAlbum(album){
    this.albums.push(album);
    notifier.change(this, {album: album, change: "addAlbum"});
  }

  getAllTracks(){
    let tracksList = [];

    this.albums.map((album) => album.tracks).forEach((tracks)=>
    {
      tracksList = tracks.concat(tracksList);
    });

    return tracksList;
  }

  getAlbumById(id) {
    return this.albums.find(album => album.id === id);
  }

  deleteAlbum(id){
    for(let i = this.albums.length - 1; i >= 0; i--) {
      if(this.albums[i].id === id) {
        this.albums.splice(i, 1);
      }
    }
  }

}


class Album {

  constructor(id, albumName, albumYear){
    this.id = id;
    this.name = albumName;
    this.year = albumYear;
    this.tracks = [];
  }

  genres(){
    let genres = [];
    this.tracks.forEach((track) => {
      genres = genres.concat(track.genre);
    });
    return genres.unique();
  }

  getTrack(name){
    return this.tracks.find(track => track.name === name);
  }

  hasATrack(track){
    return this.tracks.includes(track);
  }

}


class Track {
  
  constructor(albumName, trackName, trackDuration, genre){
    this.albumName = albumName;
    this.name = trackName;
    this.duration = trackDuration;
    this.genre = genre;
    this.lyrics = null;
    this.video = null;
  }
/*
  getLyricsMusixMatch(trackiID){
    const options = {
      uri: BASE_URLMM + `/track.lyrics.get?track_id=${trackiID}`,
      qs: {
        apikey: '0c09e6e399390218c7d8b382e1d92aba',
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
      uri: BASE_URLMM + '/track.search',
      qs: {
        apikey: '0c09e6e399390218c7d8b382e1d92aba',
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
*/
  setLyrics(lyrics){
    this.lyrics = lyrics;
  }

  getLyrics(){
    if(this.lyrics === null){
      return mmAPI.getTrackIDMusixMatch(this.name)
        .then((trackID) => mmAPI.getLyricsMusixMatch(trackID))
        .then((lyric) => {
          this.setLyrics(lyric);
          return lyric;
        });
    }
    return this.lyrics;
  }

  getVideo(){
    if(this.video === null){
      return ytAPI.getVideoInfoFromYT(this.name).
        then(res => {
          this.video = res;
          return res;
        });
    }else{
      return this.video;
    }
  }
}

class Playlist {

  constructor(playlistName, tracks, duration){
    this.name = playlistName;
    this.tracks = tracks;
    this.duration = duration;
  }

  hasTrack(aTrack){
    return this.tracks.includes(aTrack);
  }

}


class UNQfy {

  constructor(){
    this.artistsList = new Array();
    this.playlistsList = new Array();
    this.ids = 0;
    this.idsAlbums = 0;
  }

  getArtistIDByNameSpotify(name){
    if(this.getArtistsMatchingParcialName(name) == null){
      throw Error("Ese artista no se ecuentra en UNQfy");
    }
    const options = {
      url: `https://api.spotify.com/v1/search?q=${name}&type=artist&limit=1`,
      headers: { Authorization: 'Bearer ' + token },
      json: true,
    };
    return rp.get(options)
      .then((response) => {
        console.log(response.artists.items[0].id);
        return response.artists.items[0].id;
      })
      .catch((error) => console.log('Algo salio mal, puede que no exista ese artista', error));
  }

  getAlbumsFromArtistSpotify(artistId){
    const options = {
      url: `https://api.spotify.com/v1/artists/${artistId}/albums?market=ES&limit=5`,
      headers: { Authorization: 'Bearer ' + token},
      json: true,
    };
    return rp.get(options)
      .then((response) => {
        console.log(response.items);
        return response.items;
      })
      .catch((error) => console.log('Algo salio mal, puede que no exista ese ID'));  
  }

  populateAlbumsForArtist(artistName){
    return this.getArtistIDByNameSpotify(artistName)
      .then((id) => this.getAlbumsFromArtistSpotify(id))
      .then((albumsMap) => {
        albumsMap.forEach((albumMap) => {
          this.addAlbum(artistName, {name: albumMap.name, year: albumMap.release_date});
        });
        return this;
      });
  }

  deleteArtist(artist){
    this.remove(this.artistsList, artist);
    notifier.change(artist, {album: null, change: "deleteArtist"})
    
  }

  remove(list, object){
    for(let i = list.length - 1; i >= 0; i--) {
      if(list[i] === object) {
        list.splice(i, 1);
        return;
      }
    }
  }

  deleteArtistById(artistId){
    const artist = this.getArtistById(artistId);
    this.remove(this.artistsList, artist);
    notifier.change(artist, {album: null, change: "deleteArtist"})
  }

  addArtist(params) {
      if(params.name === undefined || params.country === undefined){
        throw new apiError.MissingAnArgumentOnJsonToAddAnArtistOrAlbum();
      }
      if(this.getArtistByName(params.name) !== undefined){
        throw new apiError.ErrorDuplicateEntry();
      }
        this.artistsList.push(new Artist(this.ids,params.name, params.country));
        this.ids = this.ids + 1;
      
  }

  deleteAlbum(albumId){
    const album = this.getAlbumById(albumId);
    this.artistsList.forEach((artist) => {
       if(artist.getAlbumById(albumId) == album){
         this.remove(artist.albums, album);
         return;
       }
    })
  }

  addAlbumById(artistId, params){
    if(artistId === undefined || params.name === undefined || params.year === undefined){
      throw new apiError.MissingAnArgumentOnJsonToAddAnArtistOrAlbum();
    }
    if(this.artistsList.find((artist) => artist.id === artistId) === undefined){
      throw new apiError.ErrorCantAddAlbumToANonExistingArtist();
    }
    if(this.getAlbumByName(params.name) !== undefined){
      throw new apiError.ErrorDuplicateEntry();
    }
    const albumNew = new Album(this.idsAlbums, params.name, params.year);
    this.getArtistById(artistId).addAlbum(albumNew);
    this.idsAlbums = this.idsAlbums + 1;
  }

  addAlbum(artistName, params) {
    const albumNew = new Album(this.idsAlbums, params.name, params.year);
    this.getArtistByName(artistName).addAlbum(albumNew);
    this.idsAlbums = this.idsAlbums + 1;
  }

  addTrack(albumName, params) {
    this.getAlbumByName(albumName).tracks.push(
      new Track(albumName, params.name, params.duration, params.genre));
  }

  getArtists(){
    return this.artistsList;
  }

  getArtistById(id){
    const artist = this.artistsList.find(artist => artist.id === id);
    if(artist === undefined){
      throw new apiError.DeleteOrFindANonExistingArtistOrAlbum();
    }
    return artist;
  }

  getArtistByName(name) {
    return this.artistsList.find(artist => artist.name === name);
  }

  getAlbumByName(name) {
    return this.getAllAlbums().find(album => album.name === name);
  }

  getAlbumById(id) {
    const album = this.getAllAlbums().find(album => album.id === id);
    if(album === undefined){
      throw new apiError.DeleteOrFindANonExistingArtistOrAlbum();
    } 
    return album;
  }

  getTrackByName(name) {
    return this.getAllTracks().find(track => track.name === name);
  }

  getPlaylistByName(name) {
    return this.playlistsList.find(playlist => playlist.name === name);
  }
  
  getTracksMatchingGenres(genres) {
    return this.getAllTracks().filter((track)=>genres.includes(track.genre));
  }

  getTracksMatchingArtist(artistName) { 
    return this.getArtistByName(artistName).getAllTracks();
  }

  getArtistsMatchingParcialName(parcialName) {
    return this.artistsList.filter(artist => artist.name.toLowerCase().includes(parcialName.toLowerCase()));
  }

  getAlbumsMatchingParcialName(parcialName) {
    return this.getAllAlbums().filter(album => album.name.toLowerCase().includes(parcialName));
  }

  getTracksMatchingParcialName(parcialName) {
    return this.getAllTracks().filter(track => track.name.includes(parcialName));
  }


  getAllAlbums(){
    let albums = [];

    this.artistsList.map((artist)=>artist.albums).forEach((albumsList)=>{
      albums = albums.concat(albumsList);
    });

    return albums;
  }

  getAllTracks(){
    let tracks = [];

    this.artistsList.map((artist) => artist.getAllTracks()).forEach((listOfTrack)=>
    {
      tracks = tracks.concat(listOfTrack);
    });

    return tracks;
  }

  addPlaylist(name, genresToInclude, maxDuration) {

    const listOfTracksAndTime = this.cutPlaylistByDuration(
      this.getTracksMatchingGenres(genresToInclude).sort(), maxDuration);

    this.playlistsList.push(new Playlist(name, 
      listOfTracksAndTime.tracks,
      listOfTracksAndTime.time));
  }

  cutPlaylistByDuration(tracks, maxDuration){

    let accumulatedTime = 0;
    const newtracks = [];

    tracks.forEach(track => {
      if(track.duration + accumulatedTime < maxDuration){
        newtracks.push(track);
        accumulatedTime = accumulatedTime + track.duration;
      }
      else{
        return {tracks: newtracks, time: accumulatedTime};
      }
    });
    return {tracks: newtracks, time: accumulatedTime};
  }

  save(filename = 'unqfy.json') {
    new picklejs.FileSerializer().serialize(filename, this);
  }

  static load(filename = 'unqfy.json') {
    const fs = new picklejs.FileSerializer();
    // TODO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy, Track, Album, Artist];
    fs.registerClasses(...classes);
    return fs.load(filename);
  }
}

// TODO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy, 
};
