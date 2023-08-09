const fs=require("fs")
const express=require("express")
const app=express();
app.use(express.json());
const port=3000;
const NewData={
    "First Name":"Ahmad",
    "Last Name":"Humbal",
    "Email":"Ahmadhumble21@gmail.com"
};
// console.log(typeof NewData)
// const swim=JSON.stringify(NewData)
// console.log(swim)
// const d=JSON.parse(swim)
// console.log(d)
app.get('/',(req,res)=>{
    fs.writeFile("work.json",JSON.stringify(NewData),(data,err)=>{
        res.setHeader('Content-Type',"application/json")
        res.send("data written")
    })
})
app.post("/post",(req,res)=>{
    // const d=Object.assign([NewData], [req.body])
    //
    const newTour=Object.assign({NewData},req.body)
    // NewData.push(req.body)
    fs.appendFile("work.json",JSON.stringify(req.body),()=>{
        console.log(NewData)
        console.log(typeof NewData)
        res.status(200).json({
            "status":"success",
               NewData:newTour
        })
        console.log(newTour)
    })
})
app.listen(port,()=>{
    console.log("your port is being listen")
})
