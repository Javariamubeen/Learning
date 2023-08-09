const fs=require("fs")
const dotenv= require('dotenv')
const mongoose=require('mongoose')
const users=require("./models/tourmodel")
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
        console.log(err.message)});
const user=JSON.parse(fs.readFileSync("./api.json",'utf-8'));
const importData=async()=> {
    try {
        await users.create(user)
        console.log("user data created")
    } catch (err) {
        console.log(err.message)
    }
}
importData();
module.exports=users;