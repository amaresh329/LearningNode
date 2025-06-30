const fs=require("fs");
const a=100;

setImmediate(()=>console.log("Set Immediate"));
Promise.resolve("promise").then(console.log);
fs.readFile("./file.txt","utf-8",()=>{
    console.log("File Reading CB");
})
setTimeout(()=>{
    console.log("Timer Expired");
})
process.nextTick(()=>console.log("process.nextTick"));
function printA(){
    console.log("a=",a);
}
printA();
console.log("last line of the code");

