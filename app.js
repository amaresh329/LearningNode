//import { multiply,x } from './sum.js';

// var a="namaste java script";
// var b=12;
// var c=345;
// console.log(a);
// console.log(b+c);

// console.log(global)
//console.log(this)//empty object

//console.log(globalThis)
console.log(globalThis===global)

// require('./xyz.js')
// const multiply=require('./sum.js');//importing the function from sum.js
// var a=10;
// var b=30;
// multiply(a,b)

// const obj=require('./sum.js');//when importing multiple things
// var a=10;
// var b=20;
// console.log(obj.x);
// obj.multiply(a,b)


// const{x,multiply}=require('./sum.js');//instead of storing in objects i am destructuring the exporting variables and functions
// var a=10;
// var b=40;
// multiply(a,b);
// console.log(x);


const {multiply,sum,difference,divide}=require('./calculate');
const data=require('./data.json');
console.log(JSON.stringify(data));
var a=30;
var b=20;
multiply(a,b);
sum(a,b);
difference(a,b);
divide(a,b);