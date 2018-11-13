const routes = require('express').Router();
const userRouter = require('./main-router/user.router');
const adminRouter = require('./main-router/admin.router');
const staticRouter = require('./static-router/static.router');

const path = require('path');
__dirname = path.join(__dirname, '../../');

var setResponseHeader = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    next();
};
//Running set response header before using API/Static router
routes.use(setResponseHeader);

//(user-controller) for user router (user's backend API)
//(admin-controller) for admin router (admin's backend API)
//(/static) for static router (process HTML, CSS, JS, Image file)
routes.use('/user-controller', userRouter);
routes.use('/admin-controller', adminRouter);
routes.use('/static', staticRouter);

//Implementing HTML router
var htmlRouter = function (req, res, next) {
    routes.get(req.url, (req, res) => {
        res.sendFile(__dirname + `${req.url}${req.url}.html`);
    });
    next();
};
routes.use(htmlRouter);

routes.get('/admin/login', (req, res) => {
    res.sendFile(__dirname + '/admin/adminLogin.html');
});

routes.get('/profile/change-password', (req, res) => {
    res.sendFile(__dirname + '/profile/change-password.html');
});

routes.get('/', (req, res) => {
    res.sendFile(__dirname + '/main-order/order.html');
});

module.exports = routes;