const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/routes');
const errorhandler = require('errorhandler');
const errorNotification = require('./errorHandler/controllerError');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const bodyParser = require('body-parser');
const redis = require("redis");
const client = redis.createClient();


const hostname = "127.0.0.1";
const port = 3000;


const options = {
    host: 'localhost',
    port: 6379,
    ttl: 30,
    client
}

const crud = require("./utilities/databaseCRUD");
crud.connectDatabase();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use(session({
    store: new RedisStore(options),
    secret: 'KTD',
    resave: false
}));
app.use('/', routes);

//Only use in development
//Command: ENV=dev node app.js
if (process.env.ENV === 'dev') {
    app.use(errorhandler({ log: errorNotification }));
    console.log("Hello, This is development environment");
} else {
    app.use(errorhandler({ log: false }));
}

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log(`Admin page running at http://${hostname}:${port}/admin`);
});