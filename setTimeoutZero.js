var a=32324;
var b=43434;
console.log("Hello world");

setTimeout(()=>{
    console.log("Code Executed Immediately")
},0)

setTimeout(()=>{
    console.log("execute the set timeout after 5 seconds")
},5000);

function multiply(x,y){
    const result=a*b;
    return result;
}
var c=multiply(a,b);
console.log(c);
