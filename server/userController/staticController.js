///get static file
////////////////////////////////////////

var fs = require('fs');
var path = require('path');
var errorHandler = require("../errorHandler/controllerError");

__dirname = path.join(__dirname, '../../');
console.log(__dirname);

//css router
function serveCss(request, response) {
    if (request.url.match("\.css$")) {
        var cssPath = path.join(__dirname, request.url);
        var promise = new Promise(function(resolve, reject) {
            fs.readFile(cssPath, {'encoding' : 'utf8'}, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
        promise.then(data => {
            response.writeHead(200, {"Content-Type": "text/css"});
            response.write(data);
            response.end();
            //404 is false 
            return false;
        });
        promise.catch(error => {
            //404 will be processed in errorHandler if no file is found
            console.log(`File ${request.url} is not exist`);
            errorHandler(error,response);
            //404 is false
            return false;
        });
    } else {
        //404 is true
        return true;
    }
}
//js router
function serveJs(request, response) {
    if (request.url.match("\.js$")) {
        var jsPath = path.join(__dirname, request.url);
        var promise = new Promise(function(resolve, reject) {
            fs.readFile(jsPath, {'encoding' : 'utf8'}, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
        promise.then(data => {
            response.writeHead(200, {"Content-Type": "text/javascript"});
            response.write(data);
            response.end();
            //404 is false
            return false
        });
        promise.catch(error => {
            console.log(`File ${request.url} is not exist`);
            errorHandler(error,response);
            //404 is false
            return false;
        }); 
    } else {
        //404 is true
        return true;
    }
}
//image router
function serveImage(request, response) {
    if (request.url.match("\.png$")) {
        var imagePath = path.join(__dirname, request.url);
        var promise = new Promise(function(resolve, reject) {
            fs.readFile(imagePath, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
        promise.then(data => {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(data);
            response.end();
            //404 is false
            return false
        });
        promise.catch(error => {
            console.log(`File ${request.url} is not exist`);
            errorHandler(error,response);
            //404 is false 
            return false;
        });   
    } else {
        //404 is true
        return true;
    }
}

//image router
function serveImageJpg(request, response) {
    if (request.url.match("\.jpg$")) {
        var imagePath = path.join(__dirname, request.url);
        var promise = new Promise(function(resolve, reject) {
            fs.readFile(imagePath, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
        promise.then(data => {
            response.writeHead(200, {"Content-Type": "image/jpg"});
            response.write(data);
            response.end();
            //404 is false
            return false
        });
        promise.catch(error => {
            console.log(`File ${request.url} is not exist`);
            errorHandler(error,response);
            //404 is false 
            return false;
        });
    } else {
        //404 is true
        return true;
    }
}

//html router
function serveHtml(request, response, fileName) {
    if (fileName.match("\.html$")) {
        var htmlPath = path.join(__dirname, fileName);
        var promise = new Promise(function(resolve, reject) {
            fs.readFile(htmlPath, {'encoding' : 'utf8'}, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
        promise.then(data => {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(data);
            response.end();
            //404 is false
            return false;
        });
        promise.catch(error => {
            console.log(`File ${request.url} is not exist`);
            errorHandler(error,response);
            //404 is false
            return false;
        });
    } else {
        //404 is true
        return true;
    }
}

module.exports = {
    serveCss: serveCss,
    serveHtml: serveHtml,
    serveImage: serveImage,
    serveImageJpg: serveImageJpg,
    serveJs: serveJs
}