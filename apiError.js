


class ApiError extends Error{



    constructor(name, status, errorCode, meassage = null){
        super(meassage || name);
        this.name = name;
        this.status = status;
        this.errorCode = errorCode;
    }

}


class ErrorDuplicateEntry extends ApiError{

    constructor(){
        super('ErrorDuplicateEntry', 409, 'RESOURCE_ALREADY_EXISTS');    
    }

}


class ErrorCantAddAlbumToANonExistingArtist extends ApiError{

    constructor(){
        super('ErrorCantAddAlbumToANonExistingArtist', 404, 'RELATED_SOURCE_NOT_FOUND');    
    }
}


class InvalidURL extends ApiError{
    constructor(){
        super('InvalidURL', 404, 'RESOURCE_NOT_FOUND');    
    }
}


class addOrFindANonExistingArtist extends ApiError{
    constructor(){
        super('addOrFindANonExistingArtist', 404, 'RESOURCE_ALREADY_EXISTS');    
    }
}


class InvalidJason extends ApiError{
    constructor(){
        super('InvalidJason', 400, 'BAD_REQUEST');    
    }
}

class missingAnArgumentOnJsonToAddAnArtistOrAlbum extends ApiError{
    constructor(){
        super('missingAnArgumentOnJsonToAddAnArtistOrAlbum', 400, 'BAD_REQUEST');    
    }
}

class unexpectedFailure extends ApiError{
    constructor(){
        super('unexpectedFailure', 500 , 'UNEXPECTED_FAILURE');    
    }
}


module.exports = {
    ErrorDuplicateEntry, 
  };