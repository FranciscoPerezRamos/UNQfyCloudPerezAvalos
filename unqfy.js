

const picklejs = require('picklejs');




class Artist {


  constructor(name, country){
    this.name = name;
    this.country = country;
  }


}


class Album {

  constructor(artistName, albumName, albumYear){
    this.artist = artistName;
    this.albumName = albumName;
    this.albumYear = albumYear;
  }



}


class UNQfy {

  constructor(){
    this.artistsList = new Array();
    this.albumsList = new Array();
  }

  getTracksMatchingGenres(genres) {
    // Debe retornar todos los tracks que contengan alguno de los generos en el parametro genres

  }

  getTracksMatchingArtist(artistName) {

  }


  /* Debe soportar al menos:
     params.name (string)
     params.country (string)
  */
  addArtist(params) {
    this.artistsList.push(new Artist(params.name, params.country));
  }


  /* Debe soportar al menos:
      params.name (string)
      params.year (number)
  */
  addAlbum(artistName, params) {
    this.albumsList.push(new Album(artistName, params.name, Math.floor(params.year)));
  }


  /* Debe soportar (al menos):
       params.name (string)
       params.duration (number)
       params.genres (lista de strings)
  */
  addTrack(albumName, params) {
    /* El objeto track creado debe soportar (al menos) las propiedades:
         name (string),
         duration (number),
         genres (lista de strings)
    */
  }



  getArtistByName(name) {

    let artist = this.artistsList.find(artist => artist.name === name);

    return artist;
  }


  getAlbumByName(name) {

    let album = this.albumsList.find(album => album.albumName === name);

    return album;
  }

  getTrackByName(name) {

  }

  getPlaylistByName(name) {

  }

  addPlaylist(name, genresToInclude, maxDuration) {
    /* El objeto playlist creado debe soportar (al menos):
      * una propiedad name (string)
      * un metodo duration() que retorne la duración de la playlist.
      * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist
    */

  }

  save(filename = 'unqfy.json') {
    new picklejs.FileSerializer().serialize(filename, this);
  }

  static load(filename = 'unqfy.json') {
    const fs = new picklejs.FileSerializer();
    // TODO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy];
    fs.registerClasses(...classes);
    return fs.load(filename);
  }
}

// TODO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy,
};

