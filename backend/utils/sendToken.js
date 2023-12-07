export const sendToken = (user, statusCode, res, message) =>{

    const token = user.getJWT();

    const options = {
        maxAge: 86400000,
        httpOnly: true, // make the cookie accessible only via HTTP(S) requests, not JavaScript
        // secure: true, // cookie will only be sent over HTTPS
    }

    console.log(user);
    
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        message,
        user
    })

}