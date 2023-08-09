const express=require('express')
const app=express()
const fs = require('fs');
const morgan=require("morgan")
// const port=8081;
app.use(express.json())
app.use(morgan('dev'))
const Router=express.Router()
// const Router1=express.Router()
app.use((req,res,next)=>{
    console.log("hello from middleware")
    next();
})
app.use((req,res,next)=>{
   req.requestTime=new Date().toISOString()
    next();
})
const tours=JSON.parse(
fs.readFileSync(`${__dirname}/myname/ind.json`)
);
console.log(typeof tours)

// app.get("/api/v1/tours",(req,res)=>{
//     //as we have mentioned id ,x,y so we have to give there values but with ? it becomes optional
//     if(!tours){
//         return res.status(404).json({
//             status:"invalid",
//             message:"not found"
//         })
//     }
//     res.statusCode=200;
//     res.json({
//         status: "success",
//         data: {
//             tours
//         }
//     })
// });
// app.get("/api/v1/tours/:id",(req,res)=>{
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
// });
// //using post method to handle post request
// app.post("/api/v1/tours",(req,res)=>{
//     const newId=tours[tours.length-1 ].id+1
//     const newTour=Object.assign({id:newId},req.body)
//     tours.push(newTour)
//     fs.writeFile(`${__dirname}/myname/ind.json`,JSON.stringify(tours),err=>{
//         res.status(201).json({
//             "status":"success",
//             data:{
//                 tour:newTour
//             }
//         })
//     })
// })
//  app.listen(port,()=>{
//     console.log("listening to the port 8000")
// });
//refactoring code..ROUTE HANDLERS
const postMethod= (req,res)=>{
    const newId=tours[tours.length-1 ].id+1
    const newTour=Object.assign({id:newId},req.body)
    tours.push(newTour)
    console.log(typeof tours)
    fs.writeFile(`${__dirname}/myname/ind.json`,JSON.stringify(tours),err=>{
        res.status(201).json({
            "status":"success",
            data:{
                tour:newTour
            }
        })
    })
}
const getAllMethod=(req,res)=>{
    console.log(req.requestTime)
   return res.status(404).json({
       requestedAt:req.requestTime,
        status:"success",
       data:{
            tours
       }
    })
}
const getMethod=(req,res)=>{
    //as we have mentioned id ,x,y so we have to give there values but with ? it becomes optional
    console.log(req.requestTime)
    console.log(req.params)
    const id=Number(req.params.id);
const tour=tours.find(el=>el.id===id)
    if(!tour){
        return res.status(404).json({
            status:"invalid",
            message:"not found"
        })
    }
    res.statusCode=200;
    res.json({
        status: "success",
        data: {
            tour
        }
    })
};

app.use("/api/v1/tours",Router)
app.use("/api/v1/tours/:id",Router)
Router.route("/")
.get(getAllMethod).post(postMethod)
Router.route("/:id")
.get(getMethod)
// app.get("/api/v1/tours/:id",getMethod)
// app.get("/api/v1/tours",getAllMethod)
// app.post("/api/v1/tours",postMethod)
// the above given method or chaining all the methods
// Route
// app.route("/api/v1/tours/:id")
//     .get(getMethod)
//     .post(postMethod)
//     .get(getAllMethod)
app.listen(port,()=>{
console.log("listening to the port 8000")
});
//create your own middleware
