const path=require("path")
const express=require("express")
const fs=require("fs")
const app=express()
// const port=8081;
const userRouter=express.Router();
// const userRouter1=express.Router();
const users=JSON.parse(
fs.readFileSync(`${__dirname}/myname/user.json`)
);
// app.get("/api/v1/users",(req,res)=>{
//     res.status(200).json({
//         "status":"success",
//         data:{
//             users
//         }
//     })
//     if(!users){
//         return res.status(202).json({
//             status:"failure",
//             data:"invalid entries"
//         })
//     }
// });
// app.get("/api/v1/users/:id",(req,res)=>{
// console.log(req.params)
//     const id=Number(req.params.id)
//     const user=users.find(el=>el.id===id)
// if(!user){
// return res.status(404).json({
// status:"error",
// data:"invalid data"
// })
// }
//     res.status(200).json({
//         status:"success",
//         data:{
//             user
//         }
//     })
// })
// app.listen(port,()=>{
//     console.log('port is running')
// })
//refactoring these


app.use("/api/v1/users",userRouter)
userRouter.route("/").get(getAllUser)
app.use("/api/v1/users/:id",userRouter)
userRouter.route("/:id")
    .get(getUser)
//through route
// app.route("/api/v1/users/:id").get(getUser)
// app.route("/api/v1/users").get(getAllUser)
//1st method
// app.get("/api/v1/users/:id",getUser)
// app.get("/api/v1/users",getAllUser)
app.listen(port,()=>{
    console.log('port is running')
})