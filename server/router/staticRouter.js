var serve = require("../controller/staticController");
var utilities = require("../utilities/utilities");
var path = require('path');

__dirname = path.join(__dirname, '../../')

var routeFile = [
    {   routeUrl: "/",
        routeFileName: "/main-order/order.html"},
    {   routeUrl: "/login",
        routeFileName: "/login/login.html"},
    {   routeUrl: "/profile",
        routeFileName: "/profile/profile.html"},
];

module.exports = function fileRouter(url, request, response) {
    debugger
    var routeId = routeFile.findIndex(item => item.routeUrl === url);
    if (routeId != -1) {
        utilities.setResponseHeader(response);
        serve.serveHtml(request, response, routeFile[routeId].routeFileName);
        check404 = false;
    }
    else {
        // file css, imgage, js have url == file name 
        serve.serveCss(request, response);
        serve.serveImage(request, response);
        serve.serveJs(request, response);
    }
}

