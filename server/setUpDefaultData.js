var crud = require("./utilities/databaseCRUD");
var crypto = require("crypto");
var orderModel = require("./schema/order-schema");
var productModel = require("./schema/product-schema");
var accountModel = require("./schema/account-schema");
var adminModel = require("./schema/admin-account-schema");

var product = [
    {name: "Snack mực tẩm gia vị Thái Bento 24g", img: "/static/images/Bento-Vi-Thai.png", price: 25000 },
    {name: "Snack mực tẩm gia vị cay ngọt Bento 24g", img: "/static/images/Bento-Cay-Ngot.png", price: 25000 },
    {name: "Snack mực tẩm gia vị đặc biệt Bento 24g", img: "/static/images/Bento-Dac-Biet.png", price: 25000 },
    {name: "Snack Tôm Hanami 110g", img: "/static/images/Tom-Hanami.png", price: 38000 },
    {name: "Snack Lay stax vị mực cay 110g", img: "/static/images/Lay-Stax-Muc-Cay.png", price: 31000 },
    {name: "Snack Lay Stax vị tự nhiên 110g" , img: "/static/images/Lay-Stax-Tu-Nhien.png", price: 31000 },
    {name: "Snack Lay Stax vị tôm hùm cay 110g", img: "/static/images/Lay-Stax-Tom-Hum-Cay.png", price: 31000 },
    {name: "Snack Slide vị thịt nướng 100g", img: "/static/images/Slide-Thit-Nuong.png", price: 29000 },
    {name: "Snack Slide vị Phô mai 100g", img: "/static/images/Slide-Pho-Mai.png", price: 29000 },
    {name: "Snack khoai tây Poca vị tự nhiên 100g", img: "/static/images/Poca-Tu-Nhien.png", price: 21000 },
    {name: "Snack khoai tây Poca Wavy vị BBQ 100g", img: "/static/images/Poca-Wavy-BBQ.png", price: 21000 },
    {name: "Snack khoai tây Poca vị rong biển 54g", img: "/static/images/Poca-Rong-Bien.png", price: 11000 },
    {name: "Snack khoai tây O Star vị rong biển 48g", img: "/static/images/O-Star-Rong-Bien.png", price: 12000 },
    {name: "Snack khoai tây O Star vị kim chi 48g", img: "/static/images/O-Star-Kim-Chi.png", price: 12000 },
    {name: "Snack khoai tây Orion Swing vị BBQ 48g", img: "/static/images/Orion-Swing-BBQ.png", price: 12000 },
    {name: "Snack Pillows nhân kem socola 100g", img: "/static/images/Pillows-Chocolate.png", price: 11000 },
    {name: "Snack Pillows nhân kem sữa dừa 100g", img: "/static/images/Pillows-Vi-Dua.png", price: 11000 },
    {name: "Snack Orion Toonies vị cay 38g", img: "/static/images/Toonies-Vi-Cay.png", price: 7000 },
    {name: "Snack Orion Toonies vị gà BBQ 38g", img: "/static/images/Toonies-Vi-Ga-BBQ.png", price: 7000 },
    {name: "Snack Orion Toonies vị phô mai 38g", img: "/static/images/Toonies-Vi-Pho-Mai.png", price: 7000 },
    {name: "Snack bắp rang Oishi vị caramen 40g", img: "/static/images/Oishi-Bap-Caramen.png", price: 6000 },
    {name: "Snack tôm Oishi vị cay đặc biệt 42g", img: "/static/images/Oishi-Tom-Cay-Dac-Biet.png", price: 6000 },
    {name: "Snack bánh phồng tôm Oishi vị mực 42g", img: "/static/images/Oishi-Phong-Tom.png", price: 6000 },
    {name: "Snack chay Oishi vị da heo quay 45g", img: "/static/images/Oishi-Chay-Vi-Da-Heo-Quay.png", price: 5000 },
    {name: "Snack Oishi bí đỏ vị bò nướng 42g", img: "/static/images/Oishi-Bi-Do.png", price: 6000 },
    {name: "Snack Oishi vị phô mai 42g", img: "/static/images/Oishi-Pho-Mai.png", price: 6000 },
    {name: "Snack cua Oishi vị sốt chua ngọt 45g", img: "/static/images/Oishi-Cua-Chua-Ngot.png", price: 6000 },
    {name: "Snack bắp ngọt Oishi 42g", img: "/static/images/Oishi-Bap-Ngot.png", price: 6000 },
    {name: "Snack Oishi vị hành tây 42g", img: "/static/images/Oishi-Hanh-Tay.png", price: 6000 },
    {name: "Snack Poca Partyz phồng tôm  33g", img: "/static/images/Poca-Partyz-Phong-Tom.png", price: 5000 },
    {name: "Snack Poca Partyz vị bò lúc lắc 40g", img: "/static/images/Poca-Partyz-Vi-Bo-Luc-Lac.png", price: 5000 },
    {name: "Snack Poca Partyz vị tôm hùm nướng 40g", img: "/static/images/Poca-Partyz-Vi-Tom-Hum-Nuong.png", price: 5000 },
    {name: "Snack bắp rang Puff Corn vị socola 45g", img: "/static/images/Puff-Corn-Chocolate.png", price: 6000 },
    {name: "Snack Oishi vị cà chua 40g", img: "/static/images/Oishi-Ca-Chua.png", price: 6000 },
    {name: "Snack khoai tây Oishi vị tự nhiên 40g", img: "/static/images/Oishi-Tu-Nhien.png", price: 6000 }
];
var accountArray = [
    {
        user: "hovuminhduc@gmail.com",
        password: "12345678"
    },
    {
        user: "cabcaber@gmail.com",
        password: "12345678"
    },
    {
        user: "tedotoji89@gmail.com",
        password: "12345678"
    },
    {
        user: "yellowthundercat@gmail.com",
        password: "12345678"
    },
    {
        user: "trieuthanhtr@gmail.com",
        password: "12345678"
    },
    {
        user: "oblivionbladex93@gmail.com",
        password: "12345678"
    }
];
var adminList = [{
    user: "admin@gmail.com",
    password: "admin1234",
    token: "duck"
}];
var listInfo = ["fullName", "phoneNumber", "birthday", "address", "avatarAddress"];

//function add product (want to follow order)
function addProduct(position, callback) {
    if (position < product.length) {
        crud.createDocument(productModel, product[position], () => {
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
    oneAccount.avatarAddress = "/static/images/default-avatar.png";
    crypto.randomBytes(48, function(err, buffer) {
        oneAccount.token = buffer.toString('hex');
        createFull(position+1, callback);
    });
}
function addAccount(position, callback) {
    if (position < accountArray.length) {
        crud.createDocument(accountModel, accountArray[position], addAccount(position+1, callback));
    }
    else return callback();
}
function addAdmin() {
    for (var i in adminList) {
        crud.createDocument(adminModel, adminList[i]);
    }
}
function resetData() {
    var checkDone = 0;
    crud.deleteOneCollection(orderModel, () => {
        checkDone++;
        if (checkDone == 4) {
            console.log("done");
        }
    });
    crud.deleteOneCollection(productModel, function() {
        addProduct(0, () => {
            checkDone++;
            if (checkDone == 4) {
                console.log("done");
            }
        });
    });
    crud.deleteOneCollection(accountModel, function() {
        addAccount(0, () => {
            checkDone++;
            if (checkDone == 4) {
                console.log("done");
            }
        });
    });
    crud.deleteOneCollection(adminModel, () => {
        addAdmin();
        checkDone++;
        if (checkDone == 4) {
            console.log("done");
        }
    });
}
crud.connectDatabase((err) => {
    if (err)
        console.log(err);
    createFull(0, () => {
        resetData();
    });
});