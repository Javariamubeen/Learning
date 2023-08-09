const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    Name:{
        type:String,
        cast:false,
        minlength:5,
        maxlength:15,
        required:[true,"A login Name must have type String"]
    },
    LastName:{
        type:String,
        minlength:5,
        maxlength:15,
        cast:false,
        required:[true,'A login must have lastname']
    },
    address:{
        type:String,
        cast:false,
        maxlength:30,
        required:[true,"A login must have address"]
    }
})
const UserLog=mongoose.model('UserLog',userSchema)
module.exports=UserLog;