const express = require('express');
const app = express();
const routes = require('./routes/routes');

const hostname = "127.0.0.1";
const port = 3000;

var crud = require("./utilities/databaseCRUD");
crud.connectDatabase();

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log(`Admin page running at http://${hostname}:${port}/admin`);
})
