const http = require("http")
const fs = require("fs")
// const _=require('underscore')
const path=require("path")
// const port = process.env.PORT || 8081
http.createServer(function (req, res) {
    res.setHeader('Content-Type', 'text/html')
    console.log(req.url)
    if(req.url=='/about'){
        res.statusCode =200;
        res.end('this page is about our node js, that we will use for our js backend' )
    }
    else if(req.url=='/h'){
        res.statusCode =200;
       const d= fs.readFileSync('index.html')
        res.end(d.toString());
    }
    else if(req.url=='/n'){
        res.statusCode =200;
        fs.readFile("ind.json","utf-8",(err,data)=>{
            res.setHeader('Content-Type', 'application/json')
            const obj=JSON.parse(data)
               obj.req.map(item=>{
                   console.log(item[0].type);
                   res.end(item[0].type)
               })
    });
    }
        else if(req.url=='/dis'){
            res.statusCode =200;
            res.end('writing some description from my own well i dont know any thing about them just waisting my time')
    }
    else{
        res.statusCode=405;
        res.end("data no found")
    }
}).listen(8000, ()=>{
    console.log("hello i am ")
    console.log('//////////////////////////')
});
//underscore
// const employee =[
//     {
//         id:1,
//         name:'ali',
//         age:12,
//         class:3
//     }
//     ,{
//         id:2,
//         name:'aina',
//         age:13,
//         class:4
//     },
//     {
//         id:3,
//         name:'ayla',
//         age:14,
//         class:5
//     }
// ]
//     _.map(employee,function(employ){
//         console.log(employ.id)
//     })
// _.pluck(employee,'name')
// _.chain(employee)
//     .filter(function employ(){
//    return employ.name==name;
//     })
//     .value();


// const EventEmitter =require ('events');
// class myEmitter extends EventEmitter{}
//
//     const myEmitter = new myEmitter();
// myEmitter.on('waterfall', ()=>{
//     setTimeout(()=>{
//         console.log('when tha tank is full please turn off the motor')
//     },3000)
//     console.log('turn off the motor')
// })
// myEmitter.emit('waterfall')
