const express = require('express');
const userRouter = express.Router();


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


try {
    userRouter.use('/get-products', getProduct);
    userRouter.use('/check-login', checkLogin.checkLogin);
    userRouter.use('/check-token', checkLogin.checkToken);
    userRouter.use('/submit-cart', cartHandler);
    userRouter.use('/update-password', updatePassword);
    userRouter.use('/create-user', createAccount.createUser);
    userRouter.use('/delete-user', deleteOneUser.deleteOneUser);
    userRouter.use('/upload-file',  getFile.getFile);
    userRouter.use('/get-user-info', getUserInfo);
    userRouter.use('/update-user-info', updateUserInfo);
    userRouter.use('/remove-token', deleteToken.deleteToken);
} catch (error) {
    errorHandler(error,response);
    return;
}

userRouter.get('/', (request, response) => {
    response.end("You routed to user's API router!");
})

module.exports = userRouter;