///get static file
////////////////////////////////////////
//css router

var fs = require('fs');
var path = require('path');

__dirname = path.join(__dirname, '../../')
console.log(__dirname)

function serveCss(request, response) {
    if (request.url.match("\.css$")) {
        var cssPath = path.join(__dirname, request.url);
        try {
            var file = fs.readFileSync(cssPath, {'encoding' : 'utf8'});
            response.writeHead(200, {"Content-Type": "text/css"});
            response.write(file);
            response.end();
            check404 = false;
        }
        catch (error) {
        }
    }
}
//js router
function serveJs(request, response) {
    if (request.url.match("\.js$")) {
        var jsPath = path.join(__dirname, request.url);
        try {
            var file = fs.readFileSync(jsPath, {'encoding' : 'utf8'});
            response.writeHead(200, {"Content-Type": "text/javascript"});
            response.write(file);
            response.end();
            check404 = false;
        }
        catch (error) {
        }
    } 
}
//image router
function serveImage(request, response) {
    if (request.url.match("\.png$")) {
        var imagePath = path.join(__dirname, request.url);
        try {
            var file = fs.readFileSync(imagePath);
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file);
            response.end();
            check404 = false;
        }
        catch (error) {
        }
    }
}
//html router
function serveHtml(request, response, fileName) {
    if (fileName.match("\.html$")) {
        var htmlPath = path.join(__dirname, fileName);
        try {
            var file = fs.readFileSync(htmlPath, {'encoding' : 'utf8'});
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(file);
            response.end();
            check404 = false;
        }
        catch (error) {
        }
    }
}

module.exports = {
    serveCss: serveCss,
    serveHtml: serveHtml,
    serveImage: serveImage,
    serveJs: serveJs
}