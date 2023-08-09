//route parameters
//https://www.youtube.com/watch?v=crWdh53CYnw ==> ?=start of query string....v=crWdh53CYnw is parameter
// const chalk=require("chalk")
const fs=require("fs")
const validator=require("validator")
const chalk= require("chalk")
console.log(chalk.red.underline("hello this is javaria"))
const res=validator.isEmail("javaria@gmail.com")
console.log(res ? chalk.yellow.inverse(res):chalk.red.inverse(res));
let a=fs.readFileSync("a.txt")
console.log(a.toString())
let c=fs.writeFileSync('a.txt','this is what i was going to write')
console.log(c)
fs.writeFile("a.txt",'hi i am doing my work',()=>{
    console.log("your work have done")
});
// to add data in recent file
fs.appendFile("a.txt",' so please do not disturb me  have many things to do so its a request to you',()=>{
    console.log('again work completed')
})
fs.readFile('a.txt','utf-8',(err,data)=>{
    console.log(data)
})
const bioData={
    name:"javaria",
    qualification:"bs(cs)"
}
const dataa=JSON.stringify(bioData)
console.log(bioData.name)
const data1=JSON.parse(dataa)
console.log(data1.qualification)
fs.writeFile("ind.json",dataa,(err)=>{
    console.log('this is our json data')
})
fs.readFile("index.json","utf-8",(err,data)=>{
    console.log(data)
    const orgData=JSON.parse(data)
    console.log(orgData)
})
fs.writeFile('b.txt','i am doing my work actually my today task as i have given my time to it so this work should be done very carefully and quickly',(err,data)=>{
   if (err)return  console.log(err)
    console.log('data written successfully')
})
// fs.readFile('b.txt','utf-8',(err,data)=>{
//     console.log(data)
//     console.log('data has been read carefully')
// })
const origin = fs.createReadStream('b.txt', );
const destination = fs.createWriteStream('c.txt', );
origin.pipe(destination);