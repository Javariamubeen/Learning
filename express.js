const http = require("http")
const fs = require("fs")
const express = require('express')
const app = express()
// const port = process.env.PORT || 8081  //environment variable
const port = 3000
const path=require("path")
    app.get('/about', (req, res) => {
        res.send('this page is about our node js, <br>that we will use for our js backend')
    })
    app.get('/dis', (req, res) => {
        res.send('<h1>writing some description from my own well i dont know any thing about them just waisting my time</h1>')
    })
app.get('/n', (req, res) => {
    fs.readFile("ind.json","utf-8",(err,data)=>{
        res.setHeader('Content-Type', 'application/json')
       res.send(data)
        console.log(data)
    })
})
    app.get('/h', (req, res) => {
        const d= fs.readFileSync('index.html')
        res.send(d.toString())
    })
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    });