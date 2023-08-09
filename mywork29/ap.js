const express=require("express")
const ap=express()
ap.use(express.json())
const tourRout=require('./toure')
ap.use("/api/v1/tours", tourRout)
ap.use("/api/v1/tours/:id",tourRout)
module.exports=ap;