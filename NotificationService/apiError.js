


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

class InvalidURL extends ApiError{
    constructor(){
        super('InvalidURL', 404, 'RESOURCE_NOT_FOUND');    
    }
}


class InvalidJson extends ApiError{
    constructor(){
        super('InvalidJason', 400, 'BAD_REQUEST');    
    }
}

class UnexpectedFailure extends ApiError{
    constructor(){
        super('UnexpectedFailure', 500 , 'UNEXPECTED_FAILURE');    
    }
}

class NotExistingArtist extends ApiError{
    constructor(){
        super('ArtistNotFound', 404 , 'ARTIST_NOT_FOUND');    
    }
}

module.exports = {
    ApiError,
    ErrorDuplicateEntry,
    InvalidURL,
    InvalidJson,
    UnexpectedFailure,
    NotExistingArtist,
  };