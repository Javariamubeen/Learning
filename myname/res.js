const http = require("http")
const fs = require("fs")
const path=require("path")
// const express = require('express')
// const app = express()
// const port = process.env.PORT || 8081  //environment variable
const server=http.createServer ((req,res)=>{
    fs.readFile("a=intro.txt","utf-8",(err,data)=>{
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(data )
        console.log(data)
        console.log("hello")
    })
}).listen();
console.log("hello")
