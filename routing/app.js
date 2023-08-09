//middleware declaration
const express=require("express")
const AppError=require("./../Utils/appError")
const app=express();
const globalErrorHandler=require("./../controller/errorController")
app.use(express.json());
const tourRouter=require("./tourroute")
const userRouter=require("./user")
app.use("/api/v1/tours",tourRouter)
app.use("/api/v1/tours/:id",tourRouter)
app.use("/api/v1/tours/Top-5-cheap",tourRouter)
app.use("/api/v1/users",userRouter)
app.use("/api/v1/users/:id",userRouter)
if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'))
}
app.use((req,res,next)=>{
    req.reqTime=new Date().toISOString()
    console.log(req.headers)
    next();
})
//Setting the error message for handling route errors for request url
app.all('*',(req,res,next)=> {
//     res.status(404).json({
//         status:"fail",
//         message:`can not find ${req.originalUrl} in url`
//     })
//     const err = new Error(`can not find ${req.originalUrl} in url`);
//     err.status = 'fail';
//     err.statusCode = 404
//     next(err);
    next(new AppError(`can not find ${req.originalUrl} in url on the server`,404))
})
app.use(globalErrorHandler)

module.exports=app;