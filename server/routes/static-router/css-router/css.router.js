const express = require('express');
const cssRouter = express.Router();

const path = require('path');
__dirname = path.join(__dirname, '../../../../')

var myRoutes = function (req, res, next) {
    cssRouter.use(req.url, express.static(__dirname + req.url));
    next();
}
cssRouter.use(myRoutes);

cssRouter.get('/', (request, response) => {
    response.end('You routed to cssRouter!');
})

module.exports = cssRouter;