const Tours=require('./../models/tourmodel')
const ApiFeature=require('./../Utils/apifeatures')
const catchAsync=require("./../Utils/catchAsync")
const AppError=require("./../Utils/appError")
const mongoose = require('mongoose')
const validator = require('./errorController')
// const tours=JSON.parse(
//     fs.readFileSync(`${__dirname}/../myname/ind.json`)
// );
// exports.checkBody=(req,res,next)=>{
//     if(!req.body.name||!req.body.price){
//         console.log("not correct data")
//         return res.status(404).json({
//             "status":"no name and price available"
//         })
//     }
//     next();
// }

exports.aliasTour=(req,res,next)=>{
    req.query.limit='4';
    req.query.sort='-ratingsAverage,price';
    req.query.fields='name,price,ratingsAverage,summary,difficulty';
    next();
}
exports.getTourStats=catchAsync(async (req,res,next)=> {
    const stats = await Tours.aggregate([
        //it will show all the ratings that will match the specific condition
        {
            $match: {ratingsAverage: {$gte: 4.5}}
        },

        //it will group all the documents with specific conditions
        {
            $group: {
                // _id: '$price',
                _id: {$toUpper: '$difficulty'},
                //we added one for each of the document so basically each document that will go through this document will be added to this num counter
                numTours: {$sum: 1},
                //ratings average stores the num of total ratings
                numRatings: {$sum: '$ratingsQuantity'},
                avgRating: {$avg: '$ratingsAverage'},
                avgPrice: {$avg: '$price'},
                maxPrice: {$max: '$price'},
                minPrice: {$min: '$price'}
            }
        },
        {
            $sort: {avgRating: 1}
        },
        {
            $addFields: {priceDiscount: '100'}
        }
        //this field is just to show that we can repeat fields
        // {
        //     $match:{_id:{$ne:'EASY'}}
        // }
    ])
    res.status(200).json({
        status: 'pass',
        data: {
            stats
        }
    })
})
//     try{
//
//     }catch(err){
//         res.status(404).json({
//          status:"fail",
//         message:err.message
//         })
//     }
// }
exports.getTourPlans=catchAsync(async(req,res,next)=> {
    const year = req.params.year * 1
    const plan = await Tours.aggregate([
        {
            $unwind: '$startDates'
        }, {
            $match: {
                startDates: {$gte: new Date(`${year}-01-01`), $lte: new Date(`${year}-12-31`)}
            }
        },
        {
            $group: {
                _id: {$month: '$startDates'},
                numTourStarts: {$sum: 1},
                Tour: {$push: '$name'},
            }
        },
        {
            $addFields: {priceDiscount: '100'}
        }, {
            $addFields: {month: '$_id'}
        },

        {
            //in $project we may assign 0 to exclude or 1 to include fields
            $project: {
                //as we are assigning the -id to 0 So it will not be shown up in the result
                _id: 0
            }
        }, {
            $sort: {
                //sort it by  numTourStarts  in ascending number
                numTourStarts: 1
            }
        }, {
            //how many documents we want to show in  result we'll specify that
            $limit: 12
        }
    ])
    res.status(200).json({
        status: "pass",
        data: {
            plan
        }
    })
})
//     try{
//
//     }catch(err){
//         res.status(404).json({
//             status:"fail",
//             message:err.message
//         })
//     }
// }

exports.postMethod= catchAsync(async (req,res,next)=> {
    const newTour1 = await Tours.create(req.body)
    res.status(202).json({
        "status": "success",
        data: {
            tours: newTour1
        }
    })
    next();
})
    // const newId=tours[tours.length-1 ].id+1
    // const newTour=Object.assign({id:newId},req.body)
    // tours.push(newTour)
    // fs.writeFile(`${__dirname}/../myname/ind.json`,JSON.stringify(tours),err=>{
//     try {
//
//     } catch (err) {
//         console.log(err.message)
//         res.status(402).json({
//             status: 'fail',
//             message: err.message
//         })
//     }
// }
exports.getAllFeatureMethod=catchAsync(async(req,res,next)=> {
    const feature = new ApiFeature(Tours.find(), req.query).filter().sort().limit().pagination()
    const tour = await feature.query;
    res.status(404).json({
        status: "success",
        data: {
            tour
        }
    })
    next();
})
//     try {
//
//     } catch (err) {
//         res.status(404).json({
//             status: "can't get",
//             message: err.message
//         })
//     }
// }
exports.getAllMethod=catchAsync(async(req,res,next)=> {
    // console.log(req.headers)
    const tour = await Tours.find()
    res.status(404).json({
        status: "success",
        data: {
            tour
        }
    })
    next();
})
//     try {
//
//     } catch (err) {
//         res.status(404).json({
//             status: "can't get",
//             message: err.message
//         })
//     }
// }
exports.getMethod=catchAsync(async (req,res,next)=> {
        const tourist = await Tours.findById(req.params.id)
        if(!tourist){
            return next(new AppError("Could not found Tour with that Id",404));
        }
        //Tour.findOne({_id:req.params.id})
        return res.status(404).json({
            status: "found",
            data: {
                tourist
            }
        })
})
    exports.updateMethod=catchAsync(async(req,res,next)=>{
        //we can also use tours.save to update a tour
        const tour2= await Tours.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        if(!tour2){
            return next(new AppError("Could not found Tour with that Id",404));
        }
        res.status(200).json({
            status:"pass",
            data:{
                tour2
            }
        })
    })
exports.deleteMethod=catchAsync(async(req,res,next)=>{
   const tour1= await Tours.findByIdAndDelete(req.params.id)
    if(!tour1){
        return next(new AppError("Could not found Tour with that Id",404));
    }
    res.status(200).json({
        status:"data deleted",
        data: null
    })})
    // try{
//     }catch(err){
//         res.status.json({
//             status:"fail",
//             message:err.message
//         })
//     }
// }
        // try {

//         catch (err) {
//             return res.status(404).jsotourScheman({
//                 status: "fail",
//                 message: "id not found"
//             })
//         }
// }
        //excluding some fields from query
        //1)filtering
        // const queryObj={...req.query}
        // const excludedData=['page','limit','fields','sort']
        // excludedData.forEach(el=>delete queryObj[el])
        // console.log(req.query,queryObj)
        // //1b) advance filtering
        // let queryStr=JSON.stringify(queryObj)
        // queryStr= queryStr.replace(/\b(gte|gt|lt|lte)\b/g,match=>`$${match}`)
        // console.log(JSON.parse(queryStr))
        // let query= Tours.find(JSON.parse(queryStr))
        // const query=Tours.find(queryObj)
        //2) sorting
        // if(req.query.sort){
        //     // sort= price,ratingsAverage
        //     const sortBy=req.query.sort.split(',').join(' ')
        //     query=query.sort(sortBy)
        //     // query=query.sort(req.query.sort)
        // }
        // else{
        //     query=query.sort('-createdAt')
        // }
        //3)fields limiting
        // if(req.query.fields)
        // //tours?fields=duration,difficulty,price,name
        // {
        //  const fields=req.query.fields.split(',').join(' ')
        //     query=query.select(fields)
        // }else{
        //     query=query.select('-__v ')
        // }
        //4)pagination
        // const page=req.query.page*1||1
        // const limit=req.query.limit*1||1
        // const skip=(page-1)*limit
        // query=query.skip(skip).limit(limit)
        // if(req.query.page){
        //     const tourNum=await Tours.countDocuments()
        //     if(skip>=tourNum) throw new Error("page not working properly")
        // }

        //executing query
        // const feature= new ApiFeature(Tours.find(),req.query).filter().sort().limit().pagination()
        // const tour=await  feature.query;
        // {
        //   difficulty:'easy',
        //    duration:4
        // })
        //sending response



//     try{
//
//     catch(err){
//         res.status(404).json({
//             status:"fail",
//             message:err.message
//         })
//     }
// }

// exports.getMethod=(req,res)=>{
//     //as we have mentioned id ,x,y so we have to give there values but with ? it becomes optional
//     console.log(req.params)
//     const id=Number(req.params.id);
//     // const tour=tours.find(el=>el.id===id)
//     // if(!tour){
//     //     return res.status(404).json({
//     //         status:"invalid data" ,
//     //         message:"not found data"
//     //     })
//     // }
//     // res.statusCode=200;
//     // res.json({
//     //     status: "success",
//     //     data: {
//     //         tour
//     //     }
//     // })
// {
//     "name": "The secret tour",
//     "difficulty":"easy",
//     "duration": 7,
//     "price": 497,
//     "description":"test tour",
//     "imageCover": "tour-2-cover.jpg",
//
// }
