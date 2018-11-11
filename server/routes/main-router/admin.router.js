const express = require('express');
const adminRouter = express.Router();
const utilities = require("../../utilities/utilities");

//Acquiring admin controller for admin backend
var getAdminProduct = require("../../adminController/getAdminProduct");
var getAdminUser = require("../../adminController/getAdminUser");
var getTodayOrder = require("../../adminController/getTodayOrder");
var checkProduct = require("../../adminController/checkProduct");
var loginAdmin = require("../../adminController/loginAdmin");
var getHistory = require("../../adminController/getHistory");
var changeStatus = require("../../adminController/changeStatus");
var createUser = require("../../adminController/createUser");

//API for admin backend (using try..catch)

adminRouter.use('/get-products', utilities.jsonParser(), getAdminProduct.getAdminProduct);
adminRouter.use('/get-users', utilities.jsonParser(), getAdminUser.getAdminUser);
adminRouter.use('/get-today-order', utilities.jsonParser(), getTodayOrder.getTodayOrder);
adminRouter.use('/check-login', utilities.jsonParser(), loginAdmin.checkLogin);
adminRouter.use('/check-token', utilities.jsonParser(), loginAdmin.checkToken);
adminRouter.use('/remove-token', utilities.jsonParser(), loginAdmin.deleteToken);
adminRouter.use('/check-product-name', utilities.jsonParser(), checkProduct.checkProductName);
adminRouter.use('/create-new-product', utilities.jsonParser(),  checkProduct.checkProduct);
adminRouter.use('/update-product', utilities.jsonParser(), checkProduct.updateProduct);
adminRouter.use('/get-order-history', utilities.jsonParser(), getHistory.getHistory);
adminRouter.use('/create-user', utilities.jsonParser(), createUser.createUser);
adminRouter.use('/change-order-status', utilities.jsonParser(), changeStatus.changeStatus);


//Fix file not found
adminRouter.get('/', (request, response) => {
  response.end("You routed to admin's API router!");
});

module.exports = adminRouter;