const mongoose=require('mongoose')
const express = require('express')
const app=require("./routing/appp")
const port=8081;
const DB="mongodb+srv://javaria:allah786jb@cluster0.a4wvo.mongodb.net/notors?retryWrites=true&w=majority"
mongoose.connect(DB,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log(`connection succeeded`);
}).catch(err=>{
    console.log(err)
})
app.listen(port,()=>{
    console.log(`your port have starting working ${port}`)
})
