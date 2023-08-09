//middleware function that will run when top 5 cheapest route will work

class ApiFeature{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }
    filter(){
        const queryObj={...this.queryStr}
        const excludedData=['page','limit','fields','sort']
        excludedData.forEach(el=>delete queryObj[el])
        // console.log(req.query,queryObj)
        //1b) advance filtering
        let queryStr=JSON.stringify(queryObj)
        queryStr= queryStr.replace(/\b(gte|gt|lt|lte)\b/g,match=>`$${match}`)
        console.log(JSON.parse(queryStr))
        this.query.find(JSON.parse(queryStr))
        return this;
        // let query= Tours.find(JSON.parse(queryStr))
    }
    sort(){
        if(this.queryStr.sort){
            // sort= price,ratingsAverage
            const sortBy=this.queryStr.sort.split(',').join(' ')
            this.query=this.query.sort(sortBy)
            // query=query.sort(req.query.sort)
        }
        else{
            this.query=this.query.sort('-createdAt')
        }
        return this;
    }
    limit(){
        if(this.queryStr.fields)
            //tours?fields=duration,difficulty,price,name
        {
            const fields=this.queryStr.fields.split(',').join(' ')
            this.query=this.query.select(fields)
        }else{
            this.query=this.query.select('-__v ')
        }
        return this;
    }
    pagination(){
        const page=this.queryStr.page *1||1
        const limit=this.queryStr.limit*1||1
        const skip=(page-1)*limit
        this.query=this.query.skip(skip).limit(limit)
        return this;
    }
}
module.exports=ApiFeature