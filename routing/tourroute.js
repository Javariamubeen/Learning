const express=require("express");
const Router=express.Router();
const tourController=require("./../controller/tourcontroller")
const authController=require("./../controller/authcontroller")
Router.route("/")
.post(tourController.postMethod)
.get(authController.protect,tourController.getAllMethod)
Router.route("/Top-stats")
.get(tourController.getTourStats)
Router.route("/Tour-plan/:year")
.get(tourController.getTourPlans)
Router.route("/Top-4-cheap")
.get(tourController.aliasTour,tourController.getAllFeatureMethod)
Router.route("/:id")
.get(tourController.getMethod)
.patch(tourController.updateMethod)
.delete(tourController.deleteMethod)
module.exports=Router
//
// const tours=JSON.parse(
// fs.readFileSync(`${__dirname}/../myname/ind.json`)

// );
// const postMethod= (req,res)=>{
//     const newId=tours[tours.length-1 ].id+1
//     const newTour=Object.assign({id:newId},req.body)
//     tours.push(newTour)
//     fs.writeFile(`${__dirname}/../myname/ind.json`,JSON.stringify(tours),err=>{
//         res.status(201).json({
//             "status":"success",
//             data:{
//                 tour:newTour
//             }
//         })
//     })
// }
// const getAllMethod=(req,res)=>{
//     return res.status(404).json({
//         status:"success",
//         data:{
//             tours
//         }
//     })
// }
// const getMethod=(req,res)=>{
//     //as we have mentioned id ,x,y so we have to give there values but with ? it becomes optional
//     console.log(req.params)
//     const id=Number(req.params.id);
//     const tour=tours.find(el=>el.id===id)
//     if(!tour){
//         return res.status(404).json({
//             status:"invalid",
//             message:"not found"
//         })
//     }
//     res.statusCode=200;
//     res.json({
//         status: "success",
//         data: {
//             tour
//         }
//     })
// };
// app.use("/api/v1/tours",Router)
// app.use("/api/v1/tours/:id",Router)
