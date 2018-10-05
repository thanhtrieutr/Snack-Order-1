var crud = require("./utilities/databaseCRUD");

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
//function add product (want to follow order)
function addProduct(position, callback) {
    if (position < product.length) {
        crud.createDocument("product", product[position], () => {
            addProduct(position+1, callback)
        });
    }
    else return callback();
}
function addAccount(position, callback) {
    if (position < accountArray.length) {
        crud.createDocument("account", accountArray[position], addAccount(position+1, callback));
    }
    else return callback();
}
var checkDone = false;
crud.deleteOneCollection("product", function() {
    addProduct(0, () => {
        if (checkDone) console.log("done");
        else checkDone = true;
    });
});
crud.deleteOneCollection("account", function() {
    addAccount(0, () => {
        if (checkDone) console.log("done");
        else checkDone = true;
    })
});