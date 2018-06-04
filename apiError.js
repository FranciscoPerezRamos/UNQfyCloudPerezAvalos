


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
        super('ErrorCantAddAlbumToANonExistingArtist', 404, 'RELATED_RESOURCE_NOT_FOUND');    
    }
}


class InvalidURL extends ApiError{
    constructor(){
        super('InvalidURL', 404, 'RESOURCE_NOT_FOUND');    
    }
}


class DeleteOrFindANonExistingArtistOrAlbum extends ApiError{
    constructor(){
        super('DeleteOrFindANonExistingArtistOrAlbum', 404, 'RESOURCE_NOT_FOUND');    
    }
}


class InvalidJason extends ApiError{
    constructor(){
        super('InvalidJason', 400, 'BAD_REQUEST');    
    }
}

class MissingAnArgumentOnJsonToAddAnArtistOrAlbum extends ApiError{
    constructor(){
        super('MissingAnArgumentOnJsonToAddAnArtistOrAlbum', 400, 'BAD_REQUEST');    
    }
}

class UnexpectedFailure extends ApiError{
    constructor(){
        super('UnexpectedFailure', 500 , 'UNEXPECTED_FAILURE');    
    }
}


module.exports = {
    ErrorDuplicateEntry,
    ErrorCantAddAlbumToANonExistingArtist,
    InvalidURL,
    DeleteOrFindANonExistingArtistOrAlbum,
    InvalidJason,
    MissingAnArgumentOnJsonToAddAnArtistOrAlbum,
    UnexpectedFailure,
  };