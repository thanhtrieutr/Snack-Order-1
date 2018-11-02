var crud = require("./utilities/databaseCRUD");
var crypto = require("crypto");


var product = [
    {name: "Snack mực tẩm gia vị Thái Bento 24g", price: "25.000 ₫", img: "static/images/Bento-Vi-Thai.png", priceInt: 25000 },
    {name: "Snack mực tẩm gia vị cay ngọt Bento 24g", price: "25.000 ₫", img: "static/images/Bento-Cay-Ngot.png", priceInt: 25000 },
    {name: "Snack mực tẩm gia vị đặc biệt Bento 24g", price: "25.000 ₫", img: "static/images/Bento-Dac-Biet.png", priceInt: 25000 },
    {name: "Snack Tôm Hanami 110g", price: "38.000 ₫", img: "static/images/Tom-Hanami.png", priceInt: 38000 },
    {name: "Snack Lay stax vị mực cay 110g", price: "31.000 ₫", img: "static/images/Lay-Stax-Muc-Cay.png", priceInt: 31000 },
    {name: "Snack Lay Stax vị tự nhiên 110g" , price: "31.000 ₫", img: "static/images/Lay-Stax-Tu-Nhien.png", priceInt: 31000 },
    {name: "Snack Lay Stax vị tôm hùm cay 110g", price: "31.000 ₫", img: "static/images/Lay-Stax-Tom-Hum-Cay.png", priceInt: 31000 },
    {name: "Snack Slide vị thịt nướng 100g", price: "29.000 ₫", img: "static/images/Slide-Thit-Nuong.png", priceInt: 29000 },
    {name: "Snack Slide vị Phô mai 100g", price: "29.000 ₫", img: "static/images/Slide-Pho-Mai.png", priceInt: 29000 },
    {name: "Snack khoai tây Poca vị tự nhiên 100g", price: "21.000 ₫", img: "static/images/Poca-Tu-Nhien.png", priceInt: 21000 },
    {name: "Snack khoai tây Poca Wavy vị BBQ 100g", price: "21.000 ₫", img: "static/images/Poca-Wavy-BBQ.png", priceInt: 21000 },
    {name: "Snack khoai tây Poca vị rong biển 54g", price: "11.000 ₫", img: "static/images/Poca-Rong-Bien.png", priceInt: 11000 },
    {name: "Snack khoai tây O Star vị rong biển 48g", price: "12.000 ₫", img: "static/images/O-Star-Rong-Bien.png", priceInt: 12000 },
    {name: "Snack khoai tây O Star vị kim chi 48g", price: "12.000 ₫", img: "static/images/O-Star-Kim-Chi.png", priceInt: 12000 },
    {name: "Snack khoai tây Orion Swing vị BBQ 48g", price: "12.000 ₫", img: "static/images/Orion-Swing-BBQ.png", priceInt: 12000 },
    {name: "Snack Pillows nhân kem socola 100g", price: "11.000 ₫", img: "static/images/Pillows-Chocolate.png", priceInt: 11000 },
    {name: "Snack Pillows nhân kem sữa dừa 100g", price: "11.000 ₫", img: "static/images/Pillows-Vi-Dua.png", priceInt: 11000 },
    {name: "Snack Orion Toonies vị cay 38g", price: "7.000 ₫", img: "static/images/Toonies-Vi-Cay.png", priceInt: 7000 },
    {name: "Snack Orion Toonies vị gà BBQ 38g", price: "7.000 ₫", img: "static/images/Toonies-Vi-Ga-BBQ.png", priceInt: 7000 },
    {name: "Snack Orion Toonies vị phô mai 38g", price: "7.000 ₫", img: "static/images/Toonies-Vi-Pho-Mai.png", priceInt: 7000 },
    {name: "Snack bắp rang Oishi vị caramen 40g", price: "6.000 ₫", img: "static/images/Oishi-Bap-Caramen.png", priceInt: 6000 },
    {name: "Snack tôm Oishi vị cay đặc biệt 42g", price: "6.000 ₫", img: "static/images/Oishi-Tom-Cay-Dac-Biet.png", priceInt: 6000 },
    {name: "Snack bánh phồng tôm Oishi vị mực 42g", price: "6.000 ₫", img: "static/images/Oishi-Phong-Tom.png", priceInt: 6000 },
    {name: "Snack chay Oishi vị da heo quay 45g", price: "5.000 ₫", img: "static/images/Oishi-Chay-Vi-Da-Heo-Quay.png", priceInt: 5000 },
    {name: "Snack Oishi bí đỏ vị bò nướng 42g", price: "6.000 ₫", img: "static/images/Oishi-Bi-Do.png", priceInt: 6000 },
    {name: "Snack Oishi vị phô mai 42g", price: "6.000 ₫", img: "static/images/Oishi-Pho-Mai.png", priceInt: 6000 },
    {name: "Snack cua Oishi vị sốt chua ngọt 45g", price: "6.000 ₫", img: "static/images/Oishi-Cua-Chua-Ngot.png", priceInt: 6000 },
    {name: "Snack bắp ngọt Oishi 42g", price: "6.000 ₫", img: "static/images/Oishi-Bap-Ngot.png", priceInt: 6000 },
    {name: "Snack Oishi vị hành tây 42g", price: "6.000 ₫", img: "static/images/Oishi-Hanh-Tay.png", priceInt: 6000 },
    {name: "Snack Poca Partyz phồng tôm  33g", price: "5.000 ₫", img: "static/images/Poca-Partyz-Phong-Tom.png", priceInt: 5000 },
    {name: "Snack Poca Partyz vị bò lúc lắc 40g", price: "5.000 ₫", img: "static/images/Poca-Partyz-Vi-Bo-Luc-Lac.png", priceInt: 5000 },
    {name: "Snack Poca Partyz vị tôm hùm nướng 40g", price: "5.000 ₫", img: "static/images/Poca-Partyz-Vi-Tom-Hum-Nuong.png", priceInt: 5000 },
    {name: "Snack bắp rang Puff Corn vị socola 45g", price: "6.000 ₫", img: "static/images/Puff-Corn-Chocolate.png", priceInt: 6000 },
    {name: "Snack Oishi vị cà chua 40g", price: "6.000 ₫", img: "static/images/Oishi-Ca-Chua.png", priceInt: 6000 },
    {name: "Snack khoai tây Oishi vị tự nhiên 40g", price: "6.000 ₫", img: "static/images/Oishi-Tu-Nhien.png", priceInt: 6000 }
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
    oneAccount.avatarAddress = "static/images/default-avatar.png";
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
    var checkDone = 0;
    crud.deleteOneCollection('order', () => {
        checkDone++;
        if (checkDone == 4) {
            console.log("done");
        }
    });
    crud.deleteOneCollection("product", function() {
        addProduct(0, () => {
            checkDone++;
            if (checkDone == 4) {
                console.log("done");
            }
        });
    });
    crud.deleteOneCollection("account", function() {
        addAccount(0, () => {
            checkDone++;
            if (checkDone == 4) {
                console.log("done");
            }
        })
    });
    crud.deleteOneCollection("adminAccount", () => {
        addAdmin();
        checkDone++;
        if (checkDone == 4) {
            console.log("done");
        }
    });
}
crud.connectDatabase(() => {
    createFull(0, () => {
        resetData();
    });
});