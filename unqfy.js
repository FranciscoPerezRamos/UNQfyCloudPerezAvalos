const picklejs = require('picklejs');

class Artist {

  constructor(name, country){
    this.name = name;
    this.country = country;
    this.albums = new Array();
  }

  addAlbum(anAlbum){
    this.albums.push(anAlbum);
  }

}


class Album {

  constructor(artistName, albumName, albumYear){
    this.artist = artistName;
    this.name = albumName;
    this.year = albumYear;
    this.trackList = new Array();
  }

  addTrack(aTrack){
    this.trackList.push(aTrack);
  }


  genres(){
    const genres = new Array();
    this.trackList.forEach((track) => genres.concat(track.genre)).unique();
    return genres;
  }

  getTrack(name){
    return this.trackList.find(track => track.name === name);
  }

  hasATrack(name){
    return this.trackList.some(track => track.name === name);
  }

}


class Track {
  
  constructor(albumName, author, trackName, trackDuration, genre){
    this.albumName = albumName;
    this.author = author;
    this.name = trackName;
    this.duration = trackDuration;
    this.genre = genre;
  }

}


class Playlist {

  constructor(playlistName, trackList, duration){
    this.name = playlistName;
    this.tracksList = trackList;
    this.duration = duration;
  }


  hasTrack(aTrack){
    return this.tracksList.includes(aTrack);
  }

}


class UNQfy {

  constructor(){
    this.artistsList = new Array();
    this.albumsList = new Array();
    this.playlistsList = new Array();
    this.trackList = new Array();
  }

  getTracksMatchingGenres(genres) {
    return this.trackList.filter(track=> genres.includes(track.genre));
  }

  getTracksMatchingArtist(artistName) { 
    return this.trackList.filter(track => track.author === artistName);
  }

  addArtist(params) {
    this.artistsList.push(new Artist(params.name, params.country));
  }

  addAlbum(artistName, params) {
    const albumNew = new Album(artistName, params.name, params.year);
    this.albumsList.push(albumNew);
    this.getArtistByName(artistName).addAlbum(albumNew.name);

  }

  addTrack(albumName, params) {
    const album = this.getAlbumByName(albumName);
    const track = new Track(albumName, album.artist, params.name, params.duration, params.genre);
    album.trackList.push(track.name);
    this.trackList.push(track);
  }

  getArtistByName(name) {
    return this.artistsList.find(artist => artist.name === name);
  }

  getAlbumByName(name) {
    return this.albumsList.find(album => album.name === name);
  }

  getTrackByName(name) {
    return this.trackList.find(track => track.name === name);
  }

  getPlaylistByName(name) {
    return this.playlistsList.find(playlist => playlist.name === name);
  }  

  getTracksMatchingParcialName(parcialName) {
    return this.trackList.filter(track => track.name.includes(parcialName));
  }

  getAlbumsMatchingParcialName(parcialName) {
    return this.albumsList.filter(album => album.name.includes(parcialName));
  }

  getArtistsMatchingParcialName(parcialName) {
    return this.artistsList.filter(artist => artist.name.includes(parcialName));
  }

  addPlaylist(name, genresToInclude, maxDuration) {

    const playslist = new Playlist(name, this.cutPlaylistByDuration(this.getTracksMatchingGenres(genresToInclude).sort(), maxDuration), maxDuration);

    this.playlistsList.push(playslist);

  }

  cutPlaylistByDuration(tracklist, maxDuration){

    let tiempoAcumulado = 0;
    let newTrackList = [];

    tracklist.forEach(track => {
      if(track.duration + tiempoAcumulado < maxDuration){
        newTrackList.push(track);
        tiempoAcumulado = tiempoAcumulado + track.duration;
      }
      else{
        return newTrackList;
      }
    });
    return newTrackList;
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
