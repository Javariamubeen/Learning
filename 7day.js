//setting up new file
const fs=require("fs")
const express=require("express")
const app=express()
// const port=8000;
app.get("/about",(req,res)=>{
    fs.readFile(`${__dirname}/myname/uses.json`,'utf-8',(err,data)=>{
       res.setHeader('Content-type','application/json')
        res.send(data)
        console.log(data)
        console.log("I have read this file")
    })

})
app.listen(port,()=>{
    console.log("this port has been start working")
})
//simple exporting files
function sum(a,b){
    return a+b;
}
module.exports=sum;

