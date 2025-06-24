//Modules protects their varialbles and functions from leaking
// console.log("Function is already executed");
 var x=8;
function multiply(a,b){
   const product=a*b;
   console.log(product);
}

//module.exports=multiply;//exporting the multiply function

// module.exports={//way of writing for cjs modules (common js by default there in node)
//     x:x,//this is an old way to write 
//     multiply:multiply,
// } //when exporting multiple things at a time

module.exports={x,multiply} //this is the new way to write directly
