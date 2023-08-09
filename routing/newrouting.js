const express=require("express")
const Router=express.Router()
const userController=require("./../controller/newcontroller")
Router.route("/").post(userController.postMethod).get(userController.getAllMethod)
Router.route("/:id").delete(userController.deleteMethod).patch(userController.updateMethod).get(userController.getMethod)
module.exports=Router;