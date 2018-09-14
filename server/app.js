const http = require('http');
// const querystring = require('querystring');
const hostname = "127.0.0.1";
const port = 3000;


var product = [
    {id: 1, name: "Snack Mực Tẩm Gia Vị Cay Ngọt Bento (24g)", price: "19.000 ₫", img: "https://i.imgur.com/14LDgbZ.jpg" },
    {id: 2, name: "Bánh Snack Khoai Tây Ligo (110g)", price: "35.000 ₫", img: "https://i.imgur.com/XGoBsQd.jpg" },
    {id: 3, name: "Snack rong biển Tao Kae Noi Tempura vị Cay (25g)", price: "19.000 ₫", img: "https://i.imgur.com/I753nx1.jpg" },
    {id: 4, name: "Bánh Snack Tôm NongShim Túi Lớn (180g)", price: "44.000 ₫", img: "https://i.imgur.com/53XhkaO.jpg" }
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

const server = http.createServer((request, response) => {
    var url = request.url;
    var method = request.method;
    switch (url){
        case '/products':
            if (method == 'GET') {
               setResponseHeader(response);
                response.end(JSON.stringify(product));
            }
            break;
        case '/checkLogin':
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
            break;
        case '/checkToken':
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
                        response.end(JSON.stringify(false));
                    }
                });
            }
            break;
        default:
            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/plain');
            response.end('Hello world\n');
    }
});

server.listen(port, hostname, () => {
    console.log(`Sever running at http://${hostname}:${port}/`);
});