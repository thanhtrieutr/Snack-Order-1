const express = require('express');
const userRouter = express.Router();
var utilities = require("../../utilities/utilities");

//Acquiring user controller for user backend
var checkLogin = require("../../userController/loginHandler");
var getProduct = require("../../userController/getProduct")
var cartHandler = require("../../userController/cartHandler")
var updatePassword = require("../../userController/updatePassword")
var createAccount = require("../../userController/createAccount");
var deleteOneUser = require("../../userController/deleteOneUser");
var getFile = require("../../userController/getFile");
var getUserInfo = require("../../userController/getUserInfo");
var updateUserInfo = require("../../userController/updateUserInfo");
var deleteToken = require("../../userController/deleteToken");
var errorHandler = require("../../errorHandler/controllerError");

//API for user backend (using try..catch)
try {
    userRouter.use('/get-products', getProduct);
    userRouter.use('/check-login', utilities.jsonParser(), checkLogin.checkLogin);
    userRouter.use('/check-token', utilities.jsonParser(), checkLogin.checkToken);
    userRouter.use('/submit-cart', utilities.jsonParser(), cartHandler);
    userRouter.use('/update-password', utilities.jsonParser(), updatePassword);
    userRouter.use('/create-user', utilities.jsonParser(), createAccount.createUser);
    userRouter.use('/delete-user', utilities.jsonParser(), deleteOneUser.deleteOneUser);
    userRouter.use('/upload-file', utilities.jsonParser({limit: '5mb'}), getFile.getFile);
    userRouter.use('/get-user-info', utilities.jsonParser(), getUserInfo);
    userRouter.use('/update-user-info', utilities.jsonParser(), updateUserInfo);
    userRouter.use('/remove-token', utilities.jsonParser(), deleteToken.deleteToken);
} catch (error) {
    errorHandler(error,response);
    return;
}


//Fix file not found
userRouter.get('/', (request, response) => {
    response.end("You routed to user's API router!");
})

module.exports = userRouter;