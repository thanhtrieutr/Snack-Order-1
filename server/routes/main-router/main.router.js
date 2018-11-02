const express = require('express');
const mainRouter = express.Router();

const getProduct = require("../../controller/getProduct");
const checkLogin = require("../../controller/loginHandler");
var getFile = require("../../controller/getFile");
var getUserInfo = require("../../controller/getUserInfo");

mainRouter.use('/products', getProduct);
mainRouter.use('/check-login', checkLogin.checkLogin);
mainRouter.use('/check-token', checkLogin.checkToken);
mainRouter.use('/upload-file', getFile.getFile);
mainRouter.use('/get-user-info', getUserInfo);

mainRouter.get('/', (request, response) => {
    response.end('You routed to mainRouter!');
})

module.exports = mainRouter;