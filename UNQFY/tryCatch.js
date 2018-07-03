
let artist = '{"name": "Lucas"}';
console.log(artist);

artist = JSON.stringify(artist);
console.log(artist);

artist = JSON.parse(artist)

console.log(artist);


try {
    if(!artist.country){
       throw new SyntaxError("imcoplete name: no country")
    }
    console.log(artist.country);
} catch (error) {
    console.log('Error has ocurred ' + error);
}