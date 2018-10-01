const http = require('http');
const hostname = "127.0.0.1";
const port = 3000;
var fileRouter = require("./router/staticRouter");
var mainRouter = require("./router/mainRouter");

const server = http.createServer((request, response) => {
    var check404 = fileRouter(request.url, request, response);
    mainRouter(request.url, request.method, request, response, check404);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
