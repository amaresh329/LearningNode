const fs=require("fs");
const https=require("https");
console.log("Hello World");

var a=3435545;
var b=1066;

https.get("https://dummyjson.com/products/1",(res)=>{
    console.log("Data Fetched Successfully");
})

setTimeout(()=>{
    console.log("Execute this data after 5 Seconds");
},5000)

fs.readFile("./file.txt","utf-8",(err,data)=>{
    console.log("File Data:",data);
})

function multiply(x,y){
    var result=a*b;
    return result;
}

var c=multiply(a,b);
console.log("multiplication of a,b is:",c);