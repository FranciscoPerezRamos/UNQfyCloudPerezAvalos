const rp = require('request-promise');
const artist = "bob";
const id = "4gzpq5DPGxSnKTe4SA8HAU"; // coldplay id
const token = "BQDslF-zgJCsY7FmOjqlAte98ONvtbOxU48ZUpBt6Lx0BxHqr7lac2XXxY6uNvpjtFqpqWnr6LsRMHPTmiiRSV6BkWwd18MUPvDDeTa95bDwpQKJ41Ku3LRd1vHoq6Z_D1kGG9I9bgiHpSoGgB6XP6dkuv0PBBDviBhbi57P95D9MDGzBQ";
const options = {
  url: `https://api.spotify.com/v1/artists/${id}/albums?market=ES&limit=5`,
  headers: { Authorization: 'Bearer ' + token},
  json: true,
};
rp.get(options).then((response) => console.log(response.items[0])).catch((err) => console.log("El id no existe", err));

const getAlbumsArtistById = `https://api.spotify.com/v1/artists/${id}/albums?market=ES&limit=5`; // BOB MARLEY ID: 2QsynagSdAqZj3U9HgDzjD
const getArtistByName = `https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=1`; //Si se quiere poner un segundo nombre %20 despues del nombre

