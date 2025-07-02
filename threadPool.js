/*
1.how thread pool works in libuv?
2.is node.js single threaded or multi threaded?
3.
*/

// process.env.UV_THREADPOOL_SIZE=2;
const fs=require("fs");
const crypto=require("crypto");

crypto.pbkdf2("password","salt",5000000,50,"sha512",(err,key)=>{
    console.log("1-cryptoPBKDF2 done");
})

crypto.pbkdf2("password","salt",5000000,50,"sha512",(err,key)=>{
    console.log("2-cryptoPBKDF2 done");
})

crypto.pbkdf2("password","salt",5000000,50,"sha512",(err,key)=>{
    console.log("3-cryptoPBKDF2 done");
})

crypto.pbkdf2("password","salt",5000000,50,"sha512",(err,key)=>{
    console.log("4-cryptoPBKDF2 done");
})

crypto.pbkdf2("password","salt",5000000,50,"sha512",(err,key)=>{
    console.log("5-cryptoPBKDF2 done");
})

/*
*BY default threadpool libuv size is 4 which means it can execute 4 at a time observer the above code if you execute that code it will print 4 calla at a time then it will call the 5th after
*is there any chance to change the thread pool libuv size?
   *Yes you can by using the  process.env.UV_THREADPOOL_SIZE=2; you can  keep how many threads you want in this call
*/