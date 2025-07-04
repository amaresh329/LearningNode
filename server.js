const http=require("node:http"); //const http =require("http") both are same
const server=http.createServer(function(req,res){
    if(req.url==="/getSecretData"){
        res.end("There is no secret data in the world");
    }
    res.end("Hello we created an server");
});
server.listen(5555)