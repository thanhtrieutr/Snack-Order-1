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
    {   routeUrl: "/signup",
        routeFileName: "/signup/signup.html"}
];

module.exports = function fileRouter(url, request, response) {
    var check404 = true;
    var routeId = routeFile.findIndex(item => item.routeUrl === url);
    if (routeId != -1) {
        utilities.setResponseHeader(response);
        check404 = serve.serveHtml(request, response, routeFile[routeId].routeFileName);
    }
    else {
        // file css, imgage, js have url == file name 
        //when there is suitable file, 404 is false
        check404 = check404 & serve.serveCss(request, response);
        check404 = check404 & serve.serveImage(request, response);
        check404 = check404 & serve.serveJs(request, response);
    }
    return check404;
}

