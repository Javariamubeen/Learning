//middleware declared
const express=require("express")
const app=express()
const Router=require("./../routing/newrouting")
//parses incoming JSON requests and puts the parsed data in req.
app.use(express.json())
app.use("/api/user",Router)
app.use("/api/user/:id",Router)
module.exports=app;