class CustomErrorHandler extends Error{
    constructor(status, msg){
        super();
        this.statusCode = status;
        this.message = msg;
    }


    static imageIsMissing(message = "Image is missing"){
        return new CustomErrorHandler(422, message);
    }

    
}

export default CustomErrorHandler;