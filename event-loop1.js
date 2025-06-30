const fs=require("fs");
var a=100;

setImmediate(()=>console.log("Set Immediate"));

fs.readFile("./file.txt","utf-8",()=>{
 console.log("File Reading CB");
})

setTimeout(()=>{
    console.log("Timer Expired")
},0)

function printA(){
    console.log("a=",a);
}
printA();
console.log("last line of the file");