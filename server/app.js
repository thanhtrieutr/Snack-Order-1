const http = require('http');
const hostname = "127.0.0.1";
var fs = require('fs');
var path = require('path');

const port = 3000;

__dirname = path.dirname(__dirname);

var product = [
    {id: 1, name: "Snack Mực Tẩm Gia Vị Cay Ngọt Bento (24g)", price: "19.000 ₫", img: "../images/bento.png", priceInt: 19000 },
    {id: 2, name: "Snack Khoai Tây Ligo (110g)", price: "35.000 ₫", img: "../images/ligochips.png", priceInt: 35000 },
    {id: 3, name: "Snack rong biển TaoKaeNoi Tempura (25g)", price: "19.000 ₫", img: "../images/taokaenoi.png", priceInt: 19000 },
    {id: 4, name: "Snack Tôm NongShim Túi Lớn (180g)", price: "44.000 ₫", img: "../images/tomghim.png", priceInt: 44000 },
    {id: 5, name: "Snack Mực Tẩm Gia Vị Cay Ngọt Bento (24g)", price: "19.000 ₫", img: "../images/bento.png", priceInt: 19000 },
    {id: 6, name: "Snack Khoai Tây Ligo (110g)", price: "35.000 ₫", img: "../images/ligochips.png", priceInt: 35000 },
    {id: 7, name: "Snack rong biển TaoKaeNoi Tempura (25g)", price: "19.000 ₫", img: "../images/taokaenoi.png", priceInt: 19000 },
    {id: 8, name: "Snack Tôm NongShim Túi Lớn (180g)", price: "44.000 ₫", img: "../images/tomghim.png", priceInt: 44000 },
    {id: 9, name: "Snack Mực Tẩm Gia Vị Cay Ngọt Bento (24g)", price: "19.000 ₫", img: "../images/bento.png", priceInt: 19000 },
    {id: 10, name: "Snack Khoai Tây Ligo (110g)", price: "35.000 ₫", img: "../images/ligochips.png", priceInt: 35000 },
    {id: 11, name: "Snack rong biển TaoKaeNoi Tempura (25g)", price: "19.000 ₫", img: "../images/taokaenoi.png", priceInt: 19000 },
    {id: 12, name: "Snack Tôm NongShim Túi Lớn (180g)", price: "44.000 ₫", img: "../images/tomghim.png", priceInt: 44000 }
];
var accountArray = [
    {   user: "test@gmail.com",
        password: "test1234"
    },
    {
        user: "admin@gmail.com",
        password: "admin1234"
    },
    {
        user: "guest@gmail.com",
        password: "guest1234"
    },
    {
        user: "server@gmail.com",
        password: "server1234"
    },
    {
        user: "cilent@gmail.com",
        password: "cilent1234"
    }
];

var routeFile = [
    {   routeUrl: "/order.com",
        routeFileName: "/main-order/order.html"},
    {   routeUrl: "/order.com/login",
        routeFileName: "/login/login.html"},
    {   routeUrl: "/order.com/profile",
        routeFileName: "/profile/profile.html"},
];
//Function findUserPosition:
function findValidUserPosition(accountList, user) {
    for (var i in accountList) {
        if (accountList[i].user == user.user && accountList[i].password == user.password) {
            return i;
        }
    }
    return -1;
}
function collectDataFromPost(request, callback) {
    let body = '';
    // collect data
    request.on('data', chunk => {
        body += chunk.toString();
    });
    //collect done
    request.on('end', () => {
        callback(JSON.parse(body));
    });
}
function setResponseHeader(response) {
    response.statusCode = 200;
    response.setHeader('Content-type', 'application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');
}

///get static file
////////////////////////////////////////
//css router
function serveCss(request, response) {
    if (request.url.match("\.css$")) {
        var cssPath = path.join(__dirname, request.url);
        console.log(`.${cssPath}`);
        try {
            var file = fs.readFileSync(cssPath, {'encoding' : 'utf8'});
            response.writeHead(200, {"Content-Type": "text/css"});
            response.write(file);
            console.log(file);
            response.end();
            check404 = false;
        }
        catch (error) {
        }
    }
}
//js router
function serveJs(request, response) {
    if (request.url.match("\.js$")) {
        var jsPath = path.join(__dirname, request.url);
        console.log(`.${jsPath}`);
        try {
            var file = fs.readFileSync(jsPath, {'encoding' : 'utf8'});
            response.writeHead(200, {"Content-Type": "text/javascript"});
            response.write(file);
            response.end();
            check404 = false;
        }
        catch (error) {
        }
    } 
}
//image router
function serveImage(request, response) {
    if (request.url.match("\.png$")) {
        var imagePath = path.join(__dirname, request.url);
        try {
            var file = fs.readFileSync(imagePath);
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file);
            response.end();
            check404 = false;
        }
        catch (error) {
        }
    }
}
//html router
function serveHtml(request, response, fileName) {
    if (fileName.match("\.html$")) {
        var htmlPath = path.join(__dirname, fileName);
        try {
            var file = fs.readFileSync(htmlPath, {'encoding' : 'utf8'});
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(file);
            response.end();
            check404 = false;
        }
        catch (error) {
        }
    }
}
/////////////////////////////////////////////

//function for feature
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function checkLoginHandler(request, response) {
    collectDataFromPost(request, result => {
        setResponseHeader(response);
        var position = findValidUserPosition(accountArray, result);
        if (position == -1) {
            response.end(JSON.stringify(false));
        }
        else {
            var token = Buffer.from(accountArray[position].user).toString('base64');
            response.end(JSON.stringify(token));
        }
    });
}

function checkTokenHandler(request, response) {
    collectDataFromPost(request, result => {
        //position == -1 mean don't exist that account
        var position = -1;
        for (var i in accountArray) {
            let token = Buffer.from(accountArray[i].user).toString('base64');
            if (token == result) {
                position = i;
                break;
            }
        }
        setResponseHeader(response);
        if (position != -1) {
            response.end(JSON.stringify(accountArray[position].user));
        }
        else {
            response.end(JSON.stringify(false));
        }
    });
}

function productHandler(request, response) {
    setResponseHeader(response);
    response.end(JSON.stringify(product));
}

function submitCartHandler(request, response) {
    collectDataFromPost(request, result => {
        var bill = {};
        bill.products = [];
        bill.totalPrice = 0;
        for (var i in result.cartArray) {
            for (var j in product) {
                // find match 
                if (result.cartArray[i].productID == product[j].id) {
                    bill.products.push(product[j]);
                    // calculate total price
                    var currentPrice = product[j].priceInt;
                    var currentAmount  = result.cartArray[i].amount;
                    bill.totalPrice += currentAmount * currentPrice;
                    break;
                }
            }
        }
        setResponseHeader(response);
        response.end(JSON.stringify(bill));
    });
}

function defaultHandler(response) {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'text/plain');
    response.end('No Page found\n');
}
///////////////////////////////////////////////////////////////////////////////////////

function mainRouter(url, method, request, response) {
    var route = [{
        routeUrl:"/checkLogin",
        routeMethod:"POST",
        routeHandler:checkLoginHandler
    }, {
        routeUrl:"/checkToken",
        routeMethod:"POST",
        routeHandler:checkTokenHandler
    }, {
        routeUrl:"/submitCart",
        routeMethod:"POST",
        routeHandler:submitCartHandler
    }, {
        routeUrl:"/products",
        routeMethod:"GET",
        routeHandler:productHandler
    }];
    var routeId = route.findIndex(item => item.routeUrl === url);
    if (routeId == -1) {
        if (check404 == true)
            defaultHandler(response);
    } else {
        route[routeId].routeHandler(request, response);
    }
}

function fileRouter(url, request, response) {
    debugger;
    var routeId = routeFile.findIndex(item => item.routeUrl === url);
    if (routeId != -1) {
        setResponseHeader(response);
        serveHtml(request, response, routeFile[routeId].routeFileName);
        check404 = false;
    }
    else {
        // file css, imgage, js have url == file name 
        serveCss(request, response);
        serveImage(request, response);
        serveJs(request, response);
    }
}
var check404;
const server = http.createServer((request, response) => {
    check404 = true;
    fileRouter(request.url, request, response);
    mainRouter(request.url, request.method, request, response);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
