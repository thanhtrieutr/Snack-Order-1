// const http = require('http');
// const hostname = "127.0.0.1";
// const port = 3000;
var crud = require("./utilities/databaseCRUD");
crud.connectDatabase();
var fileRouter = require("./router/staticRouter");
var mainRouter = require("./router/mainRouter");

// const server = http.createServer((request, response) => {
//     response.setHeader('Access-Control-Allow-Origin', '*');
//     var check404 = fileRouter(request.url, request, response);
//     mainRouter(request.url, request.method, request, response, check404);
// });

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
//     console.log(`Admin page running at http://${hostname}:${port}/admin`);
// });

const express = require('express');
const app = express();
const port = 3000;
const hostname = "127.0.0.1";

app.use((request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    var check404 = fileRouter(request.url, request, response);
    mainRouter(request.url, request.method, request, response, check404);
});

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log(`Admin page running at http://${hostname}:${port}/admin`);
})