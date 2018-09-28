const http = require('http');
// const querystring = require('querystring');
const hostname = "127.0.0.1";
const port = 3000;

var fs = require('fs');
var path = require('path');

__dirname = 'C:/Users/tedot/OneDrive/Máy tính/Snack-Order';

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
    {
        user: "test@gmail.com",
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
//css router
function serveCss(request, response) {
    if (request.url.match("\.css$")) {
        var cssPath = path.join(__dirname, request.url);
        console.log(`.${cssPath}`)
        var file = fs.readFileSync(cssPath, {'encoding' : 'utf8'});
        response.writeHead(200, {"Content-Type": "text/css"});
        response.write(file);
        response.end();
    }
}
//js router
function serveJs(request, response) {
    if (request.url.match("\.js$")) {
        var jsPath = path.join(__dirname, request.url);
        console.log(`.${jsPath}`)
        var file = fs.readFileSync(jsPath, {'encoding' : 'utf8'});
        response.writeHead(200, {"Content-Type": "text/javascript"});
        response.write(file);
        response.end();
    } 
}
//image router
function serveImage(request, response) {
    if (request.url.match("\.png$")) {
        var imagePath = path.join(__dirname, request.url);
        var file = fs.readFileSync(imagePath);
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(file);
        response.end();
    }
}
const server = http.createServer((request, response) => {
    var method = request.method;

    setResponseHeader(response);
    serveCss(request, response);
    serveJs(request, response);
    serveImage(request, response);
    if (request.url === "/order.com") {
            var html = fs.readFile("../main-order/order.html", "UTF-8", function(err, html){
            response.writeHead(200, {"Content-Type": "text/html"});
            response.end(html);
        });
    }
    else if (request.url === '/products') {
        if (method == 'GET') {
            setResponseHeader(response);
            response.end(JSON.stringify(product));
        }
    }
    else if (request.url === '/checkLogin') {
        if (method == "POST") {
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
    }
    else if (request.url === '/checkToken') {
        if (method == "POST") {
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
                    response.end(JSON.stringify(true));
                }
            });
        }
    }
    else if  (request.url === '/submitCart') {
        if (method == "POST") {
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
    }
    // else {
    //     response.writeHead(404, {"Content-Type": "text/html"});
    //     response.end("No Page Found");
    // }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
