const path=require("path")
const express=require("express")
// const fs=require("fs")
const app=express()
const router=express.Router()
router.get('/user', function (req, res, next) {
    res.send("finally its done with routing")
    console.log("User Router Working");
    res.end();
});
router.get('/', function (req, res, next) {
    res.send("ah its the 2nd one")
    console.log("Router Working");
    res.end();
})

module.exports=router;