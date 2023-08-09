const dotenv= require('dotenv')
const mongoose=require('mongoose')
const app=require("./routing/app")
const port=4000;
// import dotenv from "dotenv"
//we are using this code here So it will catch all types of exceptions errors
process.on('uncaughtException',err=>{
    console.log(err.name,err.message)
    console.log('Uncaught Exception Error ...App Shutting Down')
    process.exit(1)
})
dotenv.config({path:'./config.env'})
const DB= process.env.DATABASE_STRING 
// console.log(process.env.DATABASE_STRING)
// const DB="mongodb+srv://javaria:allah786jb@cluster0.a4wvo.mongodb.net/notors?retryWrites=true&w=majority";
mongoose.connect(DB,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    })
.then(()=>{console.log("connection")
})
// .catch(err=>{
// console.log(err.message)
// })
//before our app is crashed we want to save our server
const Server=app.listen(port,()=>{
console.log("your port is working")
});
console.log(process.env.USERNAME)
//global handling  'unhandled rejection error'
process.on('unhandledRejection',err=>{
    console.log(err.name,err.message)
    console.log('Unhandled Error Rejected..App Shutting Down')
    //After we have saved our server then we can say server.close So it will save all the work that isa not save or pending
    Server.close(()=>{
        //code 0 stand for success and 1 for unhandled exceptions
        process.exit(1)
    })
})

//insert data or document
// as we are using await so we have to use async
//creating one document
// const newTour=async()=>{
//     try{
//
//         const createTour= new Tour({
//             name:"mallefiicient",
//             price:800,
//             rating:7.7
//         })
// //.save method returns a promise...so we have to wait always..what if we use await and console our result?
//         const result = await createTour.save();
//         console.log(result);
//     }catch(err){
//         console.log(err.message)
//     }

// //Calling
// newTour();
//
// console.log(process.env)
// console.log(app.get("env"))

