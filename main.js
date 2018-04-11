

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

  let unqfy = getUNQfy('pepe.txt');
  

  switch(process.argv[2]){
    case 'addArtist':
    unqfy.addArtist({name: process.argv[3],  country: process.argv[4]});
    break;

    case 'addAlbum':
    unqfy.addAlbum(process.argv[3], {name: process.argv[4], year: process.argv[5]});
    break;
  }

  saveUNQfy(unqfy, 'pepe.txt');


}

main();


