const express = require('express');
const jsRouter = express.Router();

const path = require('path');
__dirname = path.join(__dirname, '../../../../')

var myRoutes = function (req, res, next) {
    jsRouter.use(req.url, express.static(__dirname + req.url));
    next();
}
jsRouter.use(myRoutes);

jsRouter.get('/', (request, response) => {
    response.end('You routed to jsRouter!');
})

module.exports = jsRouter;