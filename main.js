

const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('./unqfy');

// Retorna una instancia de UNQfy. Si existe filename, recupera la instancia desde el archivo.
function getUNQfy(filename) {
  let unqfy = new unqmod.UNQfy();
  if (fs.existsSync(filename)) {
    console.log();
    unqfy = unqmod.UNQfy.load(filename);
  }
  return unqfy;
}

// Guarda el estado de UNQfy en filename
function saveUNQfy(unqfy, filename) {
  console.log();
  unqfy.save(filename);
}


function main() {
  console.log('arguments: ');
  process.argv.forEach(argument => console.log(argument));

  const unqfy = getUNQfy('UNQfy.txt');

  let list;
  

  switch(process.argv[2]){
  case 'addArtist':
    unqfy.addArtist({name: process.argv[3].toLowerCase(),  country: process.argv[4]});
    break;

  case 'addAlbum':
<<<<<<< HEAD
    if(unqfy.getArtistByName(process.argv[3].toLowerCase()) !== undefined){
      unqfy.addAlbum(process.argv[3].toLowerCase(), {name: process.argv[4].toLowerCase(), year: parseInt( process.argv[5])});
=======
    if(unqfy.getArtistByName(process.argv[3]) !== undefined){
      unqfy.addAlbum(process.argv[3], {name: process.argv[4], year: parseInt(process.argv[5])});
>>>>>>> ce4fa88d558e2d6ff27d5e913f6bf15f29a35e25
    }else{
      console.log('No existe el artista: ' + process.argv[3]);
    }
    break;

  case 'addTrack':
<<<<<<< HEAD
    if(unqfy.getAlbumByName(process.argv[3].toLowerCase()) !== undefined){
      unqfy.addTrack(process.argv[3].toLowerCase(), {name: process.argv[4].toLowerCase(), duration: parseInt(process.argv[5]), genre: process.argv[6]});
=======
    if(unqfy.getAlbumByName(process.argv[3]) !== undefined){
      unqfy.addTrack(process.argv[3], {name: process.argv[4], duration: parseInt(process.argv[5]), genre: process.argv[6]});
>>>>>>> ce4fa88d558e2d6ff27d5e913f6bf15f29a35e25
    }else{
      console.log('No existe el album: ' + process.argv[3]);
    }
    break;

  case 'addPlaylist':
    list = (process.argv[4]).split(',');
    unqfy.addPlaylist(process.argv[3].toLowerCase(), list, parseInt(process.argv[5]));
    break;

  case 'getArtistByName':
    console.log(unqfy.getArtistByName(process.argv[3]).toLowerCase());
    break;

  case 'getAlbumByName':
    console.log(unqfy.getAlbumByName(process.argv[3]).toLowerCase());
    break;

  case 'getTrackByName':
    console.log(unqfy.getTrackByName(process.argv[3]).toLowerCase());
    break;
  
  case 'getPlaylistByName':
    console.log(unqfy.getPlaylistByName(process.argv[3]).toLowerCase());
    break;
  
  case 'getTracksMatchingGenres':
    list = process.argv[3].split(',');
    console.log(unqfy.getTracksMatchingGenres(list));
    break;
 
  case 'getTracksMatchingArtist':
    console.log(unqfy.getTracksMatchingArtist(process.argv[3].toLowerCase()));
    break;

  case 'getTracksMatchingParcialName':
    console.log(unqfy.getTracksMatchingParcialName(process.argv[3]).toLowerCase());
    break;

  case 'getAlbumsMatchingParcialName':
    console.log(unqfy.getAlbumsMatchingParcialName(process.argv[3]).toLowerCase());
    break;

  case 'getArtistsMatchingParcialName':
    console.log(unqfy.getArtistsMatchingParcialName(process.argv[3]).toLowerCase());
    break;
  }

  saveUNQfy(unqfy, 'UNQfy.txt');

}

main();


