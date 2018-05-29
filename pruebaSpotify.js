const rp = require('request-promise');
const artist = "bob";
const id = "4gzpq5DPGxSnKTe4SA8HAU"; // coldplay id
const token = "BQDhu5QyTE-WxcnHmgV0ceM2inBRtNCd7wFfqbzQhvYr0UxjxrNxNpS4Cz40aAer4pn3YoNDORJZKF3Y8Ga1x76mCljOCRdzv_1Uq950DbBUUIMW-lVulor-R-INZMzWkCjxqwaDVAssaO3dwsVYP1Hz2hUpQcnge00sTdmeUxOm401tXg";
const options = {
  url: `https://api.spotify.com/v1/artists/${id}/albums?market=ES&limit=5`,
  headers: { Authorization: 'Bearer ' + token},
  json: true,
};
rp.get(options).then((response) => console.log(response.items)).catch((err) => console.log("El id no existe", err));

const getAlbumsArtistById = `https://api.spotify.com/v1/artists/${id}/albums?market=ES&limit=5`; // BOB MARLEY ID: 2QsynagSdAqZj3U9HgDzjD
const getArtistByName = `https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=1`; //Si se quiere poner un segundo nombre %20 despues del nombre

