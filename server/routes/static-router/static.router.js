const express = require('express');
const staticRouter = express.Router();

const cssRouter = require('./css-router/css.router');
const jsRouter = require('./js-router/js.router');
const imageRouter = require('./image-router/image.router');

staticRouter.use('/css', cssRouter);
staticRouter.use('/js', jsRouter);
staticRouter.use('/image', imageRouter);

staticRouter.get('/', (request, response) => {
    response.end('You routed to staticRouter!');
})

module.exports = staticRouter;