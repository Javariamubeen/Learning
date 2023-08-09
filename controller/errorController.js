///this  what we created for error handlers(also called controllers)
//we have distinguished between development and production errors
const AppError=require("./../Utils/appError")
const handleCastErrorDB=err=>{
console.log("its  handleCastErrorD error")
    const message=`invalid ${err.path}:${err.value}`
    return new AppError(message,400)
};
const handleDuplicateField=err=>{
    const value=err.errmsg.match(/(["'])(\\?.)*?\1/)[0]
    console.log("its handleCastErrorD error")
    const message=`Duplicate field value: ${value} please enter an other value`;
    return new AppError(message,400)
}
const handleValidationErrorDB=err=>{
console.log("its handle validation error ")
    const errors=Object.values(err.errors).map(el=>el.message)
    const message=`its Validation Error. ${errors.join('. ')}`
    return new AppError(message,400)
}
const sendErrorDev=(err,res)=>{
    console.log("hi i ma here in my sendErrorDev error")
    res.status(err.statusCode).json({
        status: err.status,
        error:err,
        message: err.message,
        stack:err.stack
    });
}
const handleJWTerror=err=>{
    return new AppError("YOUR TOKEN IS INVALID!..PLEASE TRY AGAIN",401)
}
const sendErrorProd=(err,res)=>{
    console.log("hi i am are her in sendErrorProd error")
    //operational error,trusted Errors:errors that area send to clients
    if(err.isOperational){
        res.status(err.statusCode).json({
            status: "you are getting na operational error",
            message: err.message
        })
    }
    //programming or other  unknown errors:dont leak errors detail
    else{
        //log error
        console.log('error',err.message)
        //setting generic message..errors that are coming from mongodb  are not  set to be operational
         res.status(500).json({
            status:"fail",
            message:"something went wrong"
        })
    }
}
const globalErrorHandler= (err,req,res,next)=>{
    err.statusCode=err.statusCode||500;
    err.status=err.status||'error'
    console.log("hi there i am  trying to fix my error")
    if (process.env.NODE_ENV === 'development') {
        console.log("its development error")
        sendErrorDev(err,res);
        next();
    }
    else if(process.env.NODE_ENV==='production') {
        // destructured error object
        console.log("its production error");
        console.log("hi i am error",err,err.name)
        console.log(err.message)
        if (err.name ==='CastError') {
            err= handleCastErrorDB(err)
        }
        if (err.code===11000){
            err =handleDuplicateField(err)
        }
        if(err.name==='JsonWebTokenError'){
            err=handleJWTerror(err)
        }
        if(err.name==='ValidationError'){
            err=handleValidationErrorDB(err)
        }
        else{
            sendErrorProd( err,res)
            next();
        }
    }  };
module.exports = globalErrorHandler;
// module.exports = (err,req,res,next)=>{
//     err.statusCode=err.statusCode||500;
//     err.status=err.status||'internal server error';
//     if (process.env.NODE_ENV==='development') {
//         sendErrorDev(err,res);
//     }
//     else if(process.env.NODE_ENV==='Production') {
//        // destructured error object
//         console.log("here");
//         let  Error={ ...err };
//         if ( Error.name==='CastError')Error= handleCastErrorDB( Error)
//         if ( Error.code===11000)Error= handleDuplicateField (Error)
//         sendErrorProd( Error,res)
//         next();
//     }
// };
// //all the errors messages we have in our application