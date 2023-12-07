export const ErrorHandler = (err, req, res, next) =>{

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error!";


    // Wrong Mongodb Id error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err.statusCode = 400;
        err.message = message
    }

    if(err.code===11000){
        err.statusCode = 400;
        err.message = 'This Email is already registered!'
    }
    
    res.status(err.statusCode).json({ 
        success: false,
        message: err.message
    })

}