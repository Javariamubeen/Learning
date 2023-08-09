const path =require('path')
const http=require("http")
const express=require('express')
const app=express()
const fs = require('fs');
const port=8081;
const superagent=require('superagent')
const chalk= require("chalk")
const validator=require("validator");
const res=validator.isEmail("javariamubeen998.com");
console.log(res ? chalk.green.inverse(res) : chalk.red.inverse(res))
const origin = fs.createReadStream('./spam0.txt', {flags: 'r'});
const destination = fs.createWriteStream('input.txt', {flags: 'w+'});
origin.pipe(destination);
const server=http.createServer ((req,res)=>{
    fs.readFile("resume.html","utf-8",(err,data)=>{
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(data )
        console.log(data)
    })
}).listen(8000);
// promises in  node js
const readPro= file=> {
    return new Promise((resolve,reject)=>{
        fs.readFile(file,(err,data)=>{
            resolve(data)
            if (err) reject('data you have is not found')
        })
    })
}
const writeFile=(file,data)=>{
    return new Promise((resolve,reject)=>{
        fs.writeFile(file,data,(err,data)=>{
            if (err) reject('data is not written properly')
            resolve('data is written')
        })
    });
}
//using promises with asyc and await
const getNew= async()=>{
    try{
        const data=await readPro('a.txt')
        console.log(`${data}`)
        const res1=  superagent.get('https://dog.ceo/api/breeds/image/random')
        const res2= superagent.get('https://dog.ceo/api/breeds/image/random')
        const res3=  superagent.get('https://dog.ceo/api/breeds/image/random')
        const all=await Promise.all([res1,res2,res3])
        const re1=all.map(element=>element.body.message)
        console.log(re1)
        await writeFile("data.txt",re1.join('\n'))
        console.log('ok data is saved to file')
    }
    catch(err){
        console.log(err)
        throw(err)
    }
    return "i am ready"
}
 (async()=>{
    try{
        console.log("1:first")
        let x= await getNew();
        console.log(x)
        console.log("3:after")
    }catch(err){
        console.log(err)
    }
})();
console.log("1:first")
getNew().then(x=>{
    console.log(x)
    console.log("3:after")
}).catch(err=>{
console.log("ERROR OCCURED")
})

readPro('a.txt').then(data=>{
    console.log(`${data}`)
    return superagent.get('https://dog.ceo/api/breeds/image/random')
}).then(res=>{
    console.log(res.body.message)
    return writeFile("data.txt", res.body.message)
}).then(res=>{
    console.log('ok data is saved to file')
}).catch(err=> {
    console.log(err.message)
})
// dealing with multiple promises run multiple promises at the same time
// reading json data


