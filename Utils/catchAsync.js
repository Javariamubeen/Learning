// const catchAsync=fn=>{
// return(req,res,next)=>{
//   fn(req,res,next)
//         .catch(err=> next(err))
// }}
// module.exports=catchAsync
//for all catch statements that we have all in our application
const catchAsync=fn=>{
return(req,res,next)=>{
  fn(req,res,next)
// .catch(err=>{
// res.status(400).json({
// status:"cant get your request",
// message:err
// })
//  })
// // return next();
// }}
// module.exports=catchAsync
      .catch(err=> next(err))
}}
module.exports=catchAsync