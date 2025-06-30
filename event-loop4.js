const fs=require("fs");
setImmediate(()=>console.log("set Immediate"));
Promise.resolve("promise").then(console.log);
setTimeout(()=>console.log("Timer Expired"),0);
fs.readFile("./file.txt","utf-8",()=>{
    console.log("File Reading CB");
});
process.nextTick(()=>{
    process.nextTick(()=>console.log("inner next Tick"));
    console.log("nextTick");
    setImmediate(()=>console.log("2ndset Immediate"));
})
console.log("last line of the code");