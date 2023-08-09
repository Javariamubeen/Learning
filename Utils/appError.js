//we will create our all builtin error messages in here
class AppError extends Error {
    constructor(message,statusCode){
        //we are using super clas to access the properties of parent constructor class
        super(message)
        this.statusCode=statusCode;
        this.status=`${statusCode}`.startsWith('4')?'fail':'error';
        //we have created this property jus to sent error message back to the clients for these operational errors
        //this property is only for those errors that have operational errors in our program
        // if we get programming or other bug then  in our package this.operational will not run for that
        this.isOperational=true;
        Error.captureStackTrace(this,this.constructor)
        console.log( "defining th stack error",Error.stackTrace)
        console.log("HI I MA THE MAIN ERROR YOU ARE LOOKING FOR",Error)
    }
}
module.exports=AppError;