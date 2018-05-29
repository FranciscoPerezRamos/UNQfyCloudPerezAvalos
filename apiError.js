


class ApiError extends Error{



    constructor(meassage){
        super(meassage);
    }

}


class ErrorDuplicateEntry extends ApiError{

    constructor(meassage = null){
        status = 409;
        body =  {status: 409, errorCode: "RESOURCE_ALREADY_EXISTS"};
        super(meassage);    
    }

}


class ErrorCantAddAlbumToANonExistingArtist extends ApiError{

    constructor(meassage = null){
        status = 404;
        body =  {status: 404, errorCode: "RELATED_SOURCE_NOT_FOUND"};
        super(meassage);    
    }
}


class InvalidURL extends ApiError{
    constructor(meassage = null){
        status = 404;
        body =  {status: 404, errorCode: "RESOURCE_NOT_FOUND"};
        super(meassage);    
    }
}


class addOrFindANonExistingArtist extends ApiError{
    constructor(meassage = null){
        status = 404;
        body =  {status: 404, errorCode: "RESOURCE_ALREADY_EXISTS"};
        super(meassage);    
    }
}


class InvalidJason extends ApiError{
    constructor(meassage = null){
        status = 400;
        body =  {status: 400, errorCode: "BAD_REQUEST"};
        super(meassage);    
    }
}

class missingAnArgumentOnJsonToAddAnArtistOrAlbum extends ApiError{
    constructor(meassage = null){
        status = 400;
        body =  {status: 400, errorCode: "BAD_REQUEST"};
        super(meassage);    
    }
}

class unexpectedFailure extends ApiError{
    constructor(meassage = null){
        status = 500;
        body =  {status: 500, errorCode: "UNEXPECTED_FAILURE"};
        super(meassage);    
    }
}