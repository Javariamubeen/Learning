const express=require("express")
const app=express();
const Router=express.Router()
const userController=require("./../controller/usercontroller")
const authController=require('./../controller/authcontroller')
// const users=JSON.parse(
//     fs.readFileSync(`${__dirname}/../myname/user.json`)
// );
// const getAllUser=(req,res)=>{
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
// };
// const getUser=(req,res)=> {
//     console.log(req.params)
//     const id=Number(req.params.id);
//     const user=users.find(el=>el.id===id)
//     if(!user){
//         return res.status(404).json({
//             status:"invalid",
//             message:"not found"
//         })
//     }
//     res.status(200).json({
//         status: "success",
//         data: {
//             user
//         }
//     })
//
// };
//
Router.param('id',userController.checkId)
Router.post('/login',authController.login)
Router.route("/").get(userController.getAllUser)
Router.post('/signup',authController.signup)
Router.route("/:id").get(userController.getUser)
module.exports=Router;