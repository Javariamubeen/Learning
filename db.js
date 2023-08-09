const mongoose=require("mongoose")
const express=require("express")
const app=express();
require("dotenv").config();
// const port=process.env.PORT|8081;
// const DB=process.env.DATABASE;
const DB="mongodb+srv://javaria:allah786jb@cluster0.a4wvo.mongodb.net/notors?retryWrites=true&w=majority"
mongoose.connect(DB,
    // mongoose.connect('mongodb+srv://javaria:allah786jb@cluster0.a4wvo.mongodb.net/notors?retryWrites=true&w=majority',
        {
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology:true,
        useFindAndModify:false}
    ).then(()=>{
        console.log("connection establised");
        }).catch(err=>{
        console.log(err.message)
    })
app.listen(port,()=>{
    console.log("your port is runnig")
})
console.log(process.env.DATABASE_STRING)
console.log(process.env.DATABASE_PASSWORD)
//a mongoose model is a wrapper of mongoose schema, mongoose model provide interface for creating,deleting records(curd operations)..mongoose schema defines the structure of the mongoose document
// default values,validators
//  creating schemas for tours(structure)
//created structure of our document
const tourSchema=new mongoose.Schema({
        name:{
            type: String,
            //validator
            required: [true, "name should be unique"],
            unique:true
        },
        rating: {
            type: Number,
            required: true,
            unique: true
        },
        price: {
            type: Number,
            unique: [true,"Tour must have price"]
        }
    })
const Tour=mongoose.model("Tour",tourSchema)
//insert data or document
// as we are using await so we have to use async
//creating one document
// const newTour=async()=>{
//     try{
//
//         const createTour1= new Tour({
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
// }
// //Calling
// newTour();
    }
    // crateing multiple documnets
const newTour=async()=>{
    try{
        const createTour = new Tour({
            name:"the extra spice",
            price:500,
            rating:4.7
        })
        const createTour1 = new Tour({
            name:"the cool city",
            price:400,
            rating:3.7
        })
        const createTour2 = new Tour({
            name:"the main floor",
            price:300,
            rating:2.7
        })
//.save method returns a promise...so we have to wait always..what if we use await and console our result?
        const result = await Tour.insertMany([createTour,createTour1,createTour2])
        console.log(result);
    }catch(err){
        console.log(err.message)
    }
}
//Calling
newTour();