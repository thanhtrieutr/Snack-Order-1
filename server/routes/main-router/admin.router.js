const express = require('express');
const adminRouter = express.Router();


//Acquiring admin controller for admin backend
var getAdminProduct = require("../../adminController/getAdminProduct")
var getAdminUser = require("../../adminController/getAdminUser")
var getTodayOrder = require("../../adminController/getTodayOrder");
var checkProduct = require("../../adminController/checkProduct");
var loginAdmin = require("../../adminController/loginAdmin");
var getHistory = require("../../adminController/getHistory");
var changeStatus = require("../../adminController/changeStatus");
var createUser = require("../../adminController/createUser");
var errorHandler = require("../../errorHandler/controllerError");

//API for admin backend (using try..catch)
try {
  adminRouter.use('/get-products', getAdminProduct.getAdminProduct);
  adminRouter.use('/get-users', getAdminUser.getAdminUser);
  adminRouter.use('/get-today-order', getTodayOrder.getTodayOrder);
  adminRouter.use('/check-login', loginAdmin.checkLogin);
  adminRouter.use('/check-token', loginAdmin.checkToken);
  adminRouter.use('/remove-token', loginAdmin.deleteToken);
  adminRouter.use('/check-product-name', checkProduct.checkProductName);
  adminRouter.use('/create-new-product',  checkProduct.checkProduct);
  adminRouter.use('/update-product', checkProduct.updateProduct);
  adminRouter.use('/get-order-history', getHistory.getHistory);
  adminRouter.use('/create-user', createUser.createUser);
  adminRouter.use('/change-order-status', changeStatus.changeStatus);
} catch (error) {
  errorHandler(error,response);
  return;
}

//Fix file not found
adminRouter.get('/', (request, response) => {
  response.end("You routed to admin's API router!");
})

module.exports = adminRouter;