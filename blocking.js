const crypto=require("crypto");
console.log("Hello World");
console.log("==========")
var a=23423;
var b=54543;
//pbkdf --password based key derivative function
//synchronous function will block the main thread
crypto.pbkdf2Sync("password","salt",5000000,50,"sha512");
console.log("First key is generated");

setTimeout(()=>{
    console.log("call me right now!!!!")
},0)//it will only be called once call stack of main thread is empty

crypto.pbkdf2("password","salt",500000,50,"sha512",(err,data)=>{
    console.log("Second key is generated");
});

function multiply(x,y){
    const result=a*b;
    return result;
}

var c=multiply(a,b);
console.log("multiplication is ",c);