const mongoose=require("mongoose")
const validator=require("validator")
const bcrypt=require("bcryptjs")
const userSchema=new mongoose.Schema({
    Name:{
        type:String,
        cast:false,
        minlength:[5,'Name must have minimum 5 characters'],
        maxlength:[15,'Name must have more then 50 characters'],
        required:[true,"A login Name must have type String"]
    },
    email:{
        type:String,
        cast:false,
        unique:true,
        lowercase:true,
        required:[true,"A login must have email"],
        validate:[validator.isEmail,'please enter a valid email']
    },
    image:[String],
     password:{
        //hiding our password we do not want our password to be seen in post result
        select:false,
      type:String,
      minlength:5,
      maxlength:30,
      required:[true,'password required']
  },
    passwordConfirm:{
        type:String,
        minlength:5,
        //this work only for create and save..for update a user(not for find one and update
        validate:{
            validator:function(el){
                return el===this.password // password=confirm Password
            },
            message:"password  enter same password as above "
        }
    },
})
//installed bcrypt
//the more cost will be the higher the cpu intensive process will be.. nd the better password will be encrypted
//hash:one way communication..it can not be decrypted
//is modified:when any field is modified this function can run
//salt:just add random strings to passwords
//implementing encryption for that using pre save document middlewares
userSchema.pre('save',async function(next){
    //this function will only be run if the password is actually  modified
    if(!this.isModified('password'))
        return next();
    //hashed password with the cost pf 12
    this.password=await bcrypt.hash(this.password,12)
    //deleting the confirmed password..because we only need this field to validation after that we will delete it.
    this.passwordConfirm=undefined;
    next();
})
//comparing password that we have in the database and with the one that user posted
//using instance method:method that will  be available on all the documents on certain collection
userSchema.methods.correctPassword=async function(candidPassword,userPassword) {
//here we can use this.password..but we will not because we dont have password available here as we have selected that as false
//we can not compare both passwords manual bcz user password is hashed but candid is not
//this function will return true and false
return await bcrypt.compare(candidPassword,userPassword)

}

const User=mongoose.model('User',userSchema)
module.exports=User;