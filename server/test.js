var session = require('express-session');
var RedisStore = require('connect-redis')(session);
 // port 6379
app.use(session({
    store: new RedisStore(),
    secret: 'keyboard cat',
    resave: false
}));