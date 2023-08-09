const fs=require("fs")
const dotenv= require('dotenv')
const mongoose=require('mongoose')
const express=require("express")
const app=express();
app.use(express.json())
const users=require("../models/tourmodel")
dotenv.config({path:'./config.env'})
// const port=8081;
const DB="mongodb+srv://javaria:allah786jb@cluster0.a4wvo.mongodb.net/notors?retryWrites=true&w=majority"
mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
})
    .then(()=>{console.log("connection")
    })
    .catch(err=>{
        console.log(err.message)});
exports.postMethod= async (req,res)=>{
    const user = JSON.parse(fs.readFileSync("./api.json", 'utf-8'));

    // const newId=tours[tours.length-1 ].id+1
    // const newTour=Object.assign({id:newId},req.body)
    // tours.push(newTour)
    // fs.writeFile(`${__dirname}/../myname/ind.json`,JSON.stringify(tours),err=>{
    try{
        const newTour1=await users.create(user,req.body)
        res.status(201).json({
            "status":"success",
            data:{
                user:newTour1
            }
        })
    }catch(err){
        console.log(err.message)
        res.status(402).json({
            status:'fail',
            message:err
        })
    }
}
app.post("/home",(req,res)=> {
    const user = JSON.parse(fs.readFileSync("./api.json", 'utf-8'));
           const ali= users.create(user,req.body)
            res.status(404).json({
                status: "final",
                data: {
                    ali
                }
            })
            console.log("user data created")
        })
app.listen(port,()=>{
    console.log("connection established")
})
module.exports=users