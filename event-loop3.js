const fs=require("fs");
setImmediate(()=>console.log("Set Immediate"));
setTimeout(()=>console.log("timer expired"),0);
Promise.resolve("promise").then(console.log);
fs.readFile("./file.txt","utf-8",()=>{
    setTimeout(()=>console.log("2nd timer"),0);
    process.nextTick(()=>console.log("2nd nextTick"));
    setImmediate(()=>console.log("2nd setImmediate"));
    console.log("File Reading CB");
})
process.nextTick(()=>console.log("nextTick"));
console.log("last line of the code");