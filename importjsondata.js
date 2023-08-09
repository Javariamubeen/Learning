const fs=require("fs")
const dotenv= require('dotenv')
const mongoose=require('mongoose')
const tour=require("./models/tourmodel")
dotenv.config({path:'./config.env'})
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
        console.log(err.message)
    });
const tours=JSON.parse(fs.readFileSync('./api.json','utf-8'));
const importData= async()=>{
try{
    await tour.create(tours)
    console.log("data is passed")
}catch(err){
    console.log(err.message)
}
}
const deleteData=async()=>{
    try{
        await tour.deleteMany()
        console.log("data is deleted successfully")
    }catch(err){
        console.log(err)
    }
}
if(process.argv[2]==='--import'){
    importData();
}
if(process.argv[2]==='--delete'){
    deleteData();
}
module.exports=tour

