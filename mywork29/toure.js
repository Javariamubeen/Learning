const express=require("express")
const Router=express.Router();
const tourCont=require(`${__dirname}./../control/tourcont`)
Router.route("/").post(tourCont.postTour).get(tourCont.getAllTour)
Router.route("/:id").get(tourCont.getTour)
module.exports=Router;
// app.get("/api/v1/tours",getAllTour)
// app.get("/api/v1/tours/:id",getTour)
// app.post("/api/v1/tours",postTour)
// app.route("/api/v1/tours").get(getAllTour).post(postTour)
// app.route("/api/v1/tours/:id").get(getTour)

