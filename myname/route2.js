const express=require("express")
const app=express();
const things=require("./route")
app.use("/first",things)
// app.listen(3000)
