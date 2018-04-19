const picklejs = require('picklejs');

class Artist {

  constructor(name, country){
    this.name = name;
    this.country = country;
    this.albums = new Array();
  }

  addAlbum(album){
    this.albums.push(album);
  }

  getAllTracks(){
    let tracks = [];

    this.albums.map((album) => album.tracklist).forEach((tracklist)=>
    {
      tracks = tracks.concat(tracklist);
    });

    return tracks;
  }

}


class Album {

  constructor(albumName, albumYear){
    this.name = albumName;
    this.year = albumYear;
    this.tracklist = [];
  }

  genres(){
    let genres = [];
    this.tracklist.forEach((track) => {
      genres = genres.concat(track.genre);
    });
    return genres.unique();
  }

  getTrack(name){
    return this.tracklist.find(track => track.name === name);
  }

  hasATrack(track){
    return this.tracklist.includes(track);
  }

}


class Track {
  
  constructor(albumName, trackName, trackDuration, genre){
    this.albumName = albumName;
    this.name = trackName;
    this.duration = trackDuration;
    this.genre = genre;
  }

}


class Playlist {

  constructor(playlistName, tracklist, duration){
    this.name = playlistName;
    this.tracklist = tracklist;
    this.duration = duration;
  }

  hasTrack(aTrack){
    return this.tracklist.includes(aTrack);
  }

}


class UNQfy {

  constructor(){
    this.artistsList = new Array();
    this.playlistsList = new Array();
  }

  addArtist(params) {
    this.artistsList.push(new Artist(params.name, params.country));
  }

  addAlbum(artistName, params) {
    const albumNew = new Album(params.name, params.year);
    this.getArtistByName(artistName).addAlbum(albumNew);
  }

  addTrack(albumName, params) {
    this.getAlbumByName(albumName).tracklist.push(
      new Track(albumName, params.name, params.duration, params.genre));
  }

  getArtistByName(name) {
    return this.artistsList.find(artist => artist.name === name);
  }

  getAlbumByName(name) {
    return this.getAllAlbums().find(album => album.name === name);
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
    return this.artistsList.filter(artist => artist.name.includes(parcialName));
  }

  getAlbumsMatchingParcialName(parcialName) {
    return this.getAllAlbums().filter(album => album.name.includes(parcialName));
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

  cutPlaylistByDuration(tracklist, maxDuration){

    let accumulatedTime = 0;
    const newTrackList = [];

    tracklist.forEach(track => {
      if(track.duration + accumulatedTime < maxDuration){
        newTrackList.push(track);
        accumulatedTime = accumulatedTime + track.duration;
      }
      else{
        return {tracks: newTrackList, time: accumulatedTime};
      }
    });
    return {tracks: newTrackList, time: accumulatedTime};
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
