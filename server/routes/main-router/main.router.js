const express = require('express');
const mainRouter = express.Router();

const getProduct = require("../../controller/getProduct")
const checkLogin = require("../../controller/loginHandler")

mainRouter.use('/products', getProduct);
mainRouter.use('/check-login', checkLogin.checkLogin);
mainRouter.use('/check-token', checkLogin.checkToken);

mainRouter.get('/', (request, response) => {
    response.end('You routed to mainRouter!');
})

module.exports = mainRouter;