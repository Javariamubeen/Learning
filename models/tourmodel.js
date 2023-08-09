const mongoose=require("mongoose");
const slugify=require("slugify");
// const validator=require("validator");
const tourSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:[true,"A Tour must have name"],
        minlength:[5,'length must be minimum 5'],
        maxlength:[50,'length must be maximum 50'],
        // validate:[validator.isAlpha,'name should only contain characters'],
        cast:false
    },
    secretTour:{
        type:Boolean,
        default:false
    },
    duration:{
        type:Number,
        required:[true,"A Tour must have duration"]
    },
    maxGroupSize:{
        type:Number,
        required:[true,"A Tour must have maxGroupSize"]
    },
    difficulty:{
        type:String,
        required:[true,"A Tour must have difficulty"],
        enum:{
            values:['easy','medium','difficult'],
            message:'Difficulty can only be either: easy,medium,or difficult'
        }
    },
    ratingsAverage: {
        type: Number,
        min:[1,'rating must be above 1'],
        max:[5,'rating must be below 5'],
        Default:4.5
    },
    ratingsQuantity:{
        type:Number,
        Default:0
    },
    price: {
        type: Number,
        required:[true,'a tour must have price']
    },
    discount:{
        type:Number,
   validate:{
       validator:function(val){
                return val < this.price;
            },
            message:'discount price({VALUE}) must be less then total price'
        },
    },
    Summary:{
        type:String,
        trim:true
    },
    description:{
        type:String,
        required:true
    },
    imageCover: {
        type:String
    },
    slug:String,
    images:[String],
    //select=false is used to hide rom result
    createdAt:{
            type:Date,
            Default:Date.now(),
            // select:false
    },
    startDates:[Date]
},{
toJSON:{virtuals:true},
toObject:{virtuals:true}
})
//VIRTUAL PROPERTIES
//here we are using regular function so that we can point out the whole document using this keyword
//we can not use virtual properties in the query technically thats not the part of database
tourSchema.virtual('tourWeeks').get(function(){
    return this.duration/7;
})
//DOCUMENT MIDDLEWARE
//I am going to define middleware here  that will run before an actual event
//using DOCUMENT MIDDLEWARE  runs before .save and .create
//this middleware will not trigger for insertMany
//as we are using 'pre' it will run before an actual event
 //this save middleware will only be run for the save and create middleware it can not be run for insertMany find ,update or findById etc...
 tourSchema.pre('save',function(next){
     this.slug=slugify(this.name,{lower:true})
     console.log("the document is being saved")
 //by using this keyword we are pointing the currently processed document
console.log('now')
     next();
 // return this
 });
//this pre middleware is just to show that we can also use two pre middleware
// tourSchema.pre('save',function(next){
// console.log("the document is being saved")
//next();
// })
tourSchema.post('save',function(doc,next){
// doc refer to the finished document that is just saved
//     console.log(doc)
    console.log("document is saved")
    next();
})
//QUERY MIDDLEWARE
/*as we are using query middleware So it works with the find method
 for our secret TOUR AS ONLY 'FIND' METHOD IS RUN FOR IT SO FOR USING 'FindOne' OR 'FindById'  WE ARE USING REGULAR EXPRESSION
'/^find/' it will capture all methods that wil start with find keywordmkdir sequelize-migration-microservice-examplenpx sequelize-cli initen
we don't want our secret tour to run in any query*/
tourSchema.pre(/^find/,function(next){
/*we posted a document with name secretTour and set its value to true
that's a1 document is actually pour secretTour
So we don't want our that document to see in our result bcz that's our secretTour*/
    this.find({secretTour:{$ne:true}})
    this.start=Date.now();
/* after the above statement we will only see the documents that have default false value
 IN THE POST REQUEST WE CAN SEE 'secretTour=false' BUT NOT IN THE DATABASE BECAUSE THAT IS DEFINED IN OUT SCHEMA*/
    console.log('query is set to be secret')
    next();
})
tourSchema.post(/^find/,function(docs,next){
    console.log(`Query took ${Date.now()-this.start} milliseconds`)
    // console.log(docs)
    next();
})
//AGGREGATION MIDDLEWARE
tourSchema.pre('aggregation',function(next){
    this.pipeline().unshift({$match:{secretTour:{$ne:true}}})
    next();
})
const Tours=mongoose.model("Tours",tourSchema)
module.exports=Tours;
//interacts with database