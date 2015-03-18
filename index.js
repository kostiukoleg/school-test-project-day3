"use strict";

var http = require("http"),
    url = require("url"),
    routes = require("./routes");




function requestHandler(request, response){

    var parsedUrl = url.parse(request.url, true),
        method = request.method.toLowerCase();




    if(routes[method][parsedUrl.pathname]){
        routes[method][parsedUrl.pathname](request, response, function(err){
            if(err){
                response.statusCode = 500;
                response.write(JSON.stringify({
                    "message": err.message,
                    "status": "Internal Server Error"
                }));
                response.end();
            }else{
                response.end();
            }
        });
    }else{
        response.statusCode = 404;
        response.end("Not Found");
    }
}


var server  = http.createServer(requestHandler);


server.listen(3000);
