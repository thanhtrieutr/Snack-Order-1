const routes = require('express').Router();
const mainRouter = require('./main-router/main.router');
const staticRouter = require('./static-router/static.router');

const path = require('path');
__dirname = path.join(__dirname, '../../');

routes.use('/controller', mainRouter);
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