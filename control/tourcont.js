const fs=require("fs")
const tour=JSON.parse(fs.readFileSync(`${__dirname}/../myname/ind.json`));
exports.getAllTour=(req,res)=>{
    res.status(200).json({
        "status":"finally got data",
        data:{
            tour
        }
    })
    if(!tour){
        return res.status(404).json({
            status:"failure",
            data:"not found"
        })
    }
}
exports.getTour=(req,res)=>{
    const id=Number(req.params.id)
    console.log(`id:${req.params.id}`)
    const tourId=tour.find(element=>element.id===id)
    res.status(200).json({
        status:"here is the id",
        data:{
            tourId
        }
    })
    if(!tourId){
        return res.status(404).json({
            status:"failure",
            data:"not found"
        })
    };
}
exports.postTour=(req,res)=>{
    const newId=tour[tour.length-1].id+1;
    const newTour=Object.assign({id:newId},req.body)
    tour.push(newTour)
    fs.writeFile(`${__dirname}/../myname/ind.json`,JSON.stringify(tour),err=>{
        res.status(404).json({
            status:"successfully posted",
            data:{
                tours:newTour
            }
        })
    })
}