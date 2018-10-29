var crud = require("./utilities/databaseCRUD");
var crypto = require("crypto");


var product = [
    {name: "Snack Mực Tẩm Gia Vị Cay Ngọt Bento (24g)", price: "19.000 ₫", img: "../images/bento.png", priceInt: 19000 },
    {name: "Snack Khoai Tây Ligo (110g)", price: "35.000 ₫", img: "../images/ligochips.png", priceInt: 35000 },
    {name: "Snack rong biển TaoKaeNoi Tempura (25g)", price: "19.000 ₫", img: "../images/taokaenoi.png", priceInt: 19000 },
    {name: "Snack Tôm NongShim Túi Lớn (180g)", price: "44.000 ₫", img: "../images/tomghim.png", priceInt: 44000 },
    {name: "Snack Mực Tẩm Gia Vị Cay Ngọt Bento (24g)", price: "19.000 ₫", img: "../images/bento.png", priceInt: 19000 },
    {name: "Snack Khoai Tây Ligo (110g)", price: "35.000 ₫", img: "../images/ligochips.png", priceInt: 35000 },
    {name: "Snack rong biển TaoKaeNoi Tempura (25g)", price: "19.000 ₫", img: "../images/taokaenoi.png", priceInt: 19000 },
    {name: "Snack Tôm NongShim Túi Lớn (180g)", price: "44.000 ₫", img: "../images/tomghim.png", priceInt: 44000 },
    {name: "Snack Mực Tẩm Gia Vị Cay Ngọt Bento (24g)", price: "19.000 ₫", img: "../images/bento.png", priceInt: 19000 },
    {name: "Snack Khoai Tây Ligo (110g)", price: "35.000 ₫", img: "../images/ligochips.png", priceInt: 35000 },
    {name: "Snack rong biển TaoKaeNoi Tempura (25g)", price: "19.000 ₫", img: "../images/taokaenoi.png", priceInt: 19000 },
    {name: "Snack Tôm NongShim Túi Lớn (180g)", price: "44.000 ₫", img: "../images/tomghim.png", priceInt: 44000 }
];
var accountArray = [
    {
        user: "test@gmail.com",
        password: "test1234"
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
var adminList = [{
    user: "admin@gmail.com",
    password: "admin1234",
    token: "duck"
}]
var listInfo = ["fullName", "phoneNumber", "birthday", "address", "avatarAddress"];

//function add product (want to follow order)
function addProduct(position, callback) {
    if (position < product.length) {
        crud.createDocument("product", product[position], () => {
            addProduct(position+1, callback);
        });
    }
    else return callback();
}

function createFull(position, callback) {
    if (position >= accountArray.length)
        return callback();
    var oneAccount = accountArray[position];
    for (var i in listInfo) {
        oneAccount[listInfo[i]] = "";
    }
    oneAccount.avatarAddress = "https://i.imgur.com/S2IRHcz.png";
    crypto.randomBytes(48, function(err, buffer) {
        oneAccount.token = buffer.toString('hex');
        createFull(position+1, callback);
    });
}
function addAccount(position, callback) {
    if (position < accountArray.length) {
        crud.createDocument("account", accountArray[position], addAccount(position+1, callback));
    }
    else return callback();
}
function addAdmin() {
    for (var i in adminList) {
        crud.createDocument("adminAccount", adminList[i]);
    }
}
function resetData() {
    var checkDone = false;
    crud.deleteOneCollection('order', () => {
        
    });
    crud.deleteOneCollection("product", function() {
        addProduct(0, () => {
            if (checkDone) console.log("done");
            else checkDone = true;
        });
    });
    crud.deleteOneCollection("account", function() {
        addAccount(0, () => {
            if (checkDone) console.log("done");
            else    checkDone = true;
        })
    });
    crud.deleteOneCollection("adminAccount", () => {
        addAdmin();
    });
}
crud.connectDatabase(() => {
    createFull(0, () => {
        resetData();
    });
});