const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/routes');
const errorhandler = require('errorhandler');
const redis = require('redis');
const session = require('express-session');
const errorNotification = require('./errorHandler/controllerError');
const client = redis.createClient();
const bodyParser = require('body-parser');
const RedisStore = require('connect-redis')(session);



const hostname = "127.0.0.1";
const port = 3000;

const options = {
    host: 'localhost',
    port: 6379,
    ttl: 300,
    client,
}

//Only use in development
//Command: ENV=dev node app.js
if (process.env.ENV === 'dev') {
    app.use(errorhandler({ log: errorNotification }));
    console.log("Hello, This is development environment");
} else {
    app.use(errorhandler({ log: false }));
}


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use(session({
    store: new RedisStore(options),
    secret: 'ktd',
    resave: false
}));


app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log(`Admin page running at http://${hostname}:${port}/admin`);
});
