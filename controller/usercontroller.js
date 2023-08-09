const fs = require("fs")
const users=require('./../models/usermodal')
// const users=JSON.parse(
//     fs.readFileSync(`${__dirname}/../myname/uses.json`)
// );

exports.checkId=(req,res,next,val)=>{
    console.log(`here is our id ${val}`)
    const id=Number(req.params.id);
    if(id>users.length){
        return res.status(404).json({
            status:"invalid data",
            message:"not found data"
        })
    }
}

exports. getAllUser=async(req,res)=>{
    const user=await users.find()
    res.status(200).json({
        status:"success",
        data:{
            user
        }
    })
    if(!user){
        return res.status(202).json({
            status:"failure",
            data:"invalid entries"
        })
    }
};
exports. getUser=(req,res)=> {
    console.log(req.params)
    const id=Number(req.params.id);
    const user=users.findById(id)
    res.status(200).json({
        status: "success",
        data: {
            user
        }
    })

};
