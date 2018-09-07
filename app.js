const http = require('http');

const hostname = "127.0.0.1";
const port = 3000;

const books = [
    {id: 1, name: "con ga"},
    {id: 2, name: "con cho"}
];
var product = [
    {id: 1, name: "Snack Mực Tẩm Gia Vị Cay Ngọt Bento (24g)", price: "19.000 ₫", img: "https://i.imgur.com/14LDgbZ.jpg" },
    {id: 2, name: "Bánh Snack Khoai Tây Ligo (110g)", price: "35.000 ₫", img: "https://i.imgur.com/XGoBsQd.jpg" },
    {id: 3, name: "Snack rong biển Tao Kae Noi Tempura vị Cay 25g", price: "19.000 ₫", img: "https://i.imgur.com/I753nx1.jpg" },
    {id: 4, name: "Bánh Snack Tôm NongShim Túi Lớn (180g)", price: "44.000 ₫", img: "https://i.imgur.com/53XhkaO.jpg" }
];

const sever = http.createServer((request, response) => {
    var url = request.url;
    var method = request.method;
    if (url == '/products' && method == 'GET') {
        response.statusCode = 200;
        response.setHeader('Content-type', 'application/json');
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.end(JSON.stringify(product));
    }
    else {
        response.statusCode = 200;
        response.setHeader('Content-type', 'text/plain');
        response.end('Hello world\n');
    }
});

sever.listen(port, hostname, () => {
    console.log(`Sever running at http://${hostname}:${port}/`);
});