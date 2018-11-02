const routes = require('express').Router();
const userRouter = require('./main-router/user.router');
const adminRouter = require('./main-router/admin.router');
const staticRouter = require('./static-router/static.router');

const path = require('path');
__dirname = path.join(__dirname, '../../');

var setResponseHeader = function (req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    next();
}
routes.use(setResponseHeader);

routes.use('/user-controller', userRouter);
routes.use('/admin-controller', adminRouter);
routes.use('/static', staticRouter);

var htmlRouter = function (req, res, next) {
    routes.get(req.url, (req, res) => {
        res.sendFile(__dirname + `${req.url}${req.url}.html`);
    })
    next();
}
routes.use(htmlRouter);

routes.get('/', (req, res) => {
    res.sendFile(__dirname + '/main-order/order.html')
});

module.exports = routes;