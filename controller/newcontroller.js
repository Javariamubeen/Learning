const user=require("./../models/newmodel")
exports.postMethod=async(req,res)=>{
    console.log("post method")
    try{
       const newUser =await user.create(req.body)
        return res.status(200).json({
     status:"passed",
            data:{
                user:newUser
            }
        })
    }catch(err){
        console.log(err)
        res.status(404).json({
            status:"fail",
            message:err.message
        })
    }
}
exports.deleteMethod=async(req,res)=>{
    try{
        await user.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status:"data deleted",
            data: null
        })
    }catch(err){
        res.status.json({
            status:"fail",
            message:err.message
        })
    }
}
exports.updateMethod=async(req,res)=>{
    try{
        const user2= await user.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        })
        res.status(200).json({
            status:"pass",
            data:{
                user2
            }
        })
    }catch(err){
        res.status(404).json({
            status:"fail"
        })
    }
}
exports.getAllMethod=async (req,res)=> {
    console.log("inside get")
    try {
        const user3 = await user.find()
        res.status(404).json({
            status: "success",
            data: {
                user3
            }
        })
    } catch (err) {
        res.status(404).json({
            status: "can't get",
            message: err.message
        })
    }
}
exports.getMethod=async(req,res)=>{
    try{
        const user9=await user.findById(req.params.id)
        res.status(200).json({
            status:"pass",
            data:{
                user9
            }
        })
    }catch(err){
        res.status(200).json({
            status:"fail",
            message:err.message

        })
    }
}