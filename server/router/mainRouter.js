var checkLogin = require("../controller/loginHandler")
var getProduct = require("../controller/getProduct")
var cartHandler = require("../controller/cartHandler")
var updatePassword = require("../controller/updatePassword")
var createAccount = require("../controller/createAccount");
var deleteOneUser = require("../controller/deleteOneUser");
var getFile = require("../controller/getFile");
var getUserInfo = require("../controller/getUserInfo");
var updateUserInfo = require("../controller/updateUserInfo");
var deleteToken = require("../controller/deleteToken");
var getAdminProduct = require("../adminController/getAdminProduct")
var getAdminUser = require("../adminController/getAdminUser")
var getTodayOrder = require("../adminController/getTodayOrder");
var checkProduct = require("../adminController/checkProduct");
var errorHandler = require("../errorHandler/controllerError");
var loginAdmin = require("../adminController/loginAdmin");
var getHistory = require("../adminController/getHistory");
var changeStatus = require("../adminController/changeStatus");


module.exports = function mainRouter(url, method, request, response, check404) {
    var route = [{
        routeUrl: "/check-login",
        routeMethod: "POST",
        routeHandler: checkLogin.checkLogin
    }, {
        routeUrl: "/check-token",
        routeMethod: "POST",
        routeHandler: checkLogin.checkToken
    }, {
        routeUrl: "/submit-cart",
        routeMethod: "POST",
        routeHandler: cartHandler
    }, {
        routeUrl:"/products",
        routeMethod:"GET",
        routeHandler:getProduct
    }, {
        routeUrl:"/update-password",
        routeMethod:"POST",
        routeHandler:updatePassword
    }, {
        routeUrl: "/create-user",
        routeMethod: "POST",
        routeHandler: createAccount.createUser
    }, {
        routeUrl: "/delete-user",
        routeMethod: "POST",
        routeHandler: deleteOneUser.deleteOneUser
    }, {
        routeUrl: "/upload-file",
        routeMethod: "POST",
        routeHandler: getFile.getFile
    }, {
        routeUrl: "/get-user-info",
        routeMethod: "POST",
        routeHandler: getUserInfo
    }, {
        routeUrl: "/update-user-info",
        routeMethod: "POST",
        routeHandler: updateUserInfo
    }, {
        routeUrl: "/remove-token",
        routeMethod: "POST",
        routeHandler: deleteToken.deleteToken
    },{
        routeUrl: "/admin/products",
        routeMethod: "POST",
        routeHandler: getAdminProduct.getAdminProduct
    },{
        routeUrl: "/admin/users",
        routeMethod: "POST",
        routeHandler: getAdminUser.getAdminUser
    }, {
        routeUrl: "/admin/get-today-order",
        routeMethod: "POST",
        routeHandler: getTodayOrder.getTodayOrder
    }, {
        routeUrl: "/admin/check-login",
        routeMethod: "POST",
        routeHandler: loginAdmin.checkLogin
    }, {
        routeUrl: "/admin/check-token",
        routeMethod: "POST",
        routeHandler: loginAdmin.checkToken
    }, {
        routeUrl: "/admin/remove-token",
        routeMethod: "POST",
        routeHandler: loginAdmin.deleteToken
    }, {
        routeUrl: "/admin/check-product-name",
        routeMethod: "POST",
        routeHandler: checkProduct.checkProductName
    }, {
        routeUrl: "/admin/create-new-product",
        routeMethod: "POST",
        routeHandler: checkProduct.checkProduct
    }, {
        routeUrl: "/admin/update-product",
        routeMethod: "POST",
        routeHandler: checkProduct.updateProduct
    },{
        routeUrl: "/admin/history",
        routeMethod: "POST",
        routeHandler: getHistory.getHistory
    }, {
        routeUrl: "/admin/change-status",
        routeMethod: "POST",
        routeHandler: changeStatus.changeStatus
    }];
    try {
        var routeId = route.findIndex(item => item.routeUrl === url);
        if (routeId == -1) {
            if (check404 == true)
                throw new Error("File not found");
        } else {
            if (route[routeId].routeMethod === method) {
            route[routeId].routeHandler(request, response);
            } 
            else {
                throw new Error("File not found");
            }
        }
    }  
    catch (error) {
        errorHandler(error,response);
        return;
    } 
}
/////////////////////////////////////////////
