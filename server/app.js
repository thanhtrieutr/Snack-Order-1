var crud = require("./utilities/databaseCRUD");
crud.connectDatabase();
var fileRouter = require("./router/staticRouter");
var mainRouter = require("./router/mainRouter");

const express = require('express');
const app = express();
const port = 3000;
const hostname = "127.0.0.1";

app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    request.check404 = fileRouter(request.url, request, response);
    next()
});

app.use((request, response, next) => {
    mainRouter(request.url, request.method, request, response, request.check404);
});

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log(`Admin page running at http://${hostname}:${port}/admin`);
})