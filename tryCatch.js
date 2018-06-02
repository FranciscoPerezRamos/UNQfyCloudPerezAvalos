
let artistJSON = '{"name": "Lucas"}';

let artist = JSON.parse(artistJSON); 

try {
    if(!artist.country){
       throw new SyntaxError("imcoplete name: no country")
    }
    console.log(artist.country);
} catch (error) {
    console.log('Error has ocurred ' + error);
}