const express = require('express');
const userRouter = express.Router();
var utilities = require("../../utilities/utilities");

//Acquiring user controller for user backend
var checkLogin = require("../../userController/loginHandler");
var getProduct = require("../../userController/getProduct");
var cartHandler = require("../../userController/cartHandler");
var updatePassword = require("../../userController/updatePassword");
var getFile = require("../../userController/getFile");
var getUserInfo = require("../../userController/getUserInfo");
var updateUserInfo = require("../../userController/updateUserInfo");
var deleteToken = require("../../userController/deleteToken");
var getUser = require("../../userController/users");
var session = require("../../app");

//API for user backend (using try..catch)
userRouter.use('/get-products', getProduct);
userRouter.use('/check-login', utilities.jsonParser(), checkLogin.checkLogin);
userRouter.use('/check-token', utilities.jsonParser(), checkLogin.checkToken);
userRouter.use('/submit-cart', utilities.jsonParser(), cartHandler);
userRouter.use('/update-password', utilities.jsonParser(), updatePassword);
userRouter.use('/upload-file', getFile.getFile);
userRouter.use('/get-user-info', utilities.jsonParser(), getUserInfo);
userRouter.use('/update-user-info', utilities.jsonParser(), updateUserInfo);
userRouter.use('/remove-token', utilities.jsonParser(), deleteToken.deleteToken);
userRouter.use('/get-user', utilities.jsonParser(), getUser.getUser);
userRouter.use('/validate-code', utilities.jsonParser(), getUser.validateCode);
userRouter.get('/huy',(request,response, next) => {
    console.log("dcm")
    response.end("its okay");
})
userRouter.post('/huy', (request, response, next) => {
    const data = request.body;
    request.session.user = data.username;
    request.session.password = data.password;
    response.end("its okay");
})

//Fix file not found
userRouter.get('/', (request, response) => {
    response.end("You routed to user's API router!");
});

module.exports = userRouter;