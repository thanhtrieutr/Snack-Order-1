var checkLogin = require("../controller/loginHandler")
var getProduct = require("../controller/getProduct")
var cartHandler = require("../controller/cartHandler")
var createAccount = require("../controller/createAccount");

function defaultHandler(response) {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'text/plain');
    response.end('No Page found\n');
}

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
        routeUrl: "/products",
        routeMethod: "GET",
        routeHandler: getProduct
    }, {
        routeUrl: "/createUser",
        routeMethod: "POST",
        routeHandler: createAccount.createUser
    }];
    var routeId = route.findIndex(item => item.routeUrl === url);
    if (routeId == -1) {
        if (check404 == true)
            defaultHandler(response);
    } else {
        route[routeId].routeHandler(request, response);
    }
}
/////////////////////////////////////////////
