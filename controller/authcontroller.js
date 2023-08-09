const user=require("./../models/usermodal")
const {promisify}=require("util")
const jwt=require("jsonwebtoken")
const AppError=require("./../Utils/appError")
const catchAsync = require("./../Utils/catchAsync")
const signToken=id=> {
    //payload is always the user id for which the token was issued
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}
exports.signup=catchAsync(async(req,res,next)=> {
    // const newUser=await user.create(req.body)
    const newUser = await user.create({
        Name: req.body.Name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    })
    //created token
    const Token=signToken(newUser._id)
        res.status(200).json({
            //sending token gto client
            Token,
            status:"pass",
            data:{
                user:newUser
            }
        })
    next();
})
exports.login=catchAsync(async (req,res,next)=>{
    const {email,password}=req.body
    //check if email and password exits
    if(!email||!password){
        return next(new AppError('please provide your email and password ',401))
    }
    //check if password and email is correct
    //we are including our password field here explicitly by(+password) just to check weather user enter correct password or not
    //COMPARING
    const users=await user.findOne({email}).select('+password')
    //using instance method correct password here
    //if user doesn't exit then this cannot run
    const correct=await users.correctPassword(password,users.password)
    // console.log(users)
    //CHECKING IF THEY ARE CORRECT OR NOT
    if(!users||!correct){
        return next(new AppError("incorrect password and email",401))
    }
    const Token=signToken(users._id)
    res.status(200).json({
        status:"pass",
        Token,
    })
})
exports.protect=catchAsync(async(req,res,next)=>{
    // 1)getting token and checking if it is there
    let Token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bias')){
        Token=req.headers.authorization.split(' ')[1]
    }
    console.log(Token)
    if(!Token){
        return next(new AppError('token is not found',401))
    }
    // 2)verifying token
    const decode= await promisify(jwt.verify)(Token,process.env.JWT_SECRET)
    console.log(decode)
    // 3)checking if user still exits
    // 4)checking if user have not changed password after the token has issued
next();
})
//installed mpm jsonwebtoken