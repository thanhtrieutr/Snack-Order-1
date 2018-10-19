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
var errorHandler = require("../errorHandler/controllerError");

module.exports = function mainRouter(url, method, request, response, check404) {
    var route = [{
        routeUrl: "/checkLogin",
        routeMethod: "POST",
        routeHandler: checkLogin.checkLogin
    }, {
        routeUrl: "/checkToken",
        routeMethod: "POST",
        routeHandler: checkLogin.checkToken
    }, {
        routeUrl: "/submitCart",
        routeMethod: "POST",
        routeHandler: cartHandler
    }, {
        routeUrl:"/products",
        routeMethod:"GET",
        routeHandler:getProduct
    }, {
        routeUrl:"/updatePassword",
        routeMethod:"POST",
        routeHandler:updatePassword
    }, {
        routeUrl: "/createUser",
        routeMethod: "POST",
        routeHandler: createAccount.createUser
    }, {
        routeUrl: "/deleteUser",
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
