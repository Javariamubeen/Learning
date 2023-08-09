const EventEmitter=require("events")
const fs= require('fs')
const http =require('http')
const server=http.createServer( )
server.on("request",(req,res)=> {
//     fs.readFile('input.txt',(err,data)=>{
//         if(err)return console.log(err);
//        res.end(data.toString())
//     })
// })
// server.listen(8000)
    const stream = fs.createReadStream("input.txt")
    stream.on("data", chunk => {
        res.write(chunk);
    })
    stream.on("end", () => {
        res.end();
    })
    stream.on("error",()=>{
res.end('file not found')
    })
stream.pipe(res)
});
server.listen(8000)
// const event=new EventEmitter
// event.on('waterfall',()=>{
//     console.log("your event has been fired")
// })
// event.emit('waterfall')
// event.on('checkPage',(sc,msg)=>{
//     console.log(`check my page if the status code is ${sc} and status message is ${msg}`)
// })
// event.emit('checkPage',200,'ok')
