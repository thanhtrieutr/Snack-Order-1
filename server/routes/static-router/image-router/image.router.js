const express = require('express');
const imageRouter = express.Router();

const path = require('path');
__dirname = path.join(__dirname + '../../../../../client/src/assets');

imageRouter.use(express.static(__dirname + '/images'));

imageRouter.get('/', (request, response) => {
    response.end('You routed to imageRouter!');
});

module.exports = imageRouter;