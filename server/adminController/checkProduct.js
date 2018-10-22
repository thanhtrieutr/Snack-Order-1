var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var adminUtilities = require("../adminController/adminUtilities");
var errorHandler = require("../errorHandler/controllerError");

function checkValidProduct(productName) {
    if (productName == "" || productName == null || productName.length > 40) {
        return true; 
    } 
    else return /[!@#$%^&*_+\-=\[\]{};':"\\|,.<>\/?]/.test(productName);
}
function checkPrice(productPrice){
    if (productPrice == "" || productPrice == null || productPrice.length > 6) {
        return true; 
    } 
    if (isNaN(productPrice)) 
    {
        return true
    }
    return false;
}

function checkFile(productImage) {
    if (!productImage.file || !productImage.fileName) {
        return true;
    }
    var fileName = utilities.modifyFileName(productImage.fileName);
    debugger;
    if (fileName == false) {
        return true;
    }
    return false;
}


function checkProductName(request, response) {
    var collectClient = new Promise((resolve, reject) => { 
        utilities.collectDataFromPost(request, result => {
            if (result instanceof Error) {
                reject(result);
            }
            resolve(result);
        });
    });
    var collectProductList = new Promise(function(resolve, reject) {
        crud.readDatabase("product", function(object,error) {
            if (error) {
                reject(error);
            } 
            else {
                resolve(object);
            }
        });
    });
    Promise.all([collectClient, collectProductList]).then(result => {
        var token = result[0].token;
        var products = result[1];
        if (token != "token")
            throw new Error("Authentication Error");
        if (checkValidProduct(result[0].productName)) {
            throw new Error("Wrong Data Input");
        } 
        for (var i = 0; i < products.length; i++) {
            if (products[i].name == result[0].productName) {
                throw new Error("Wrong Data Input");
            }
        }
        response.end("OK");
    }).catch(error => {
        errorHandler(error,response);
        return;
    });
}

function checkProduct(request, response) {
    var collectClient = new Promise((resolve, reject) => { 
        utilities.collectDataFromPost(request, result => {
            debugger
            if (result instanceof Error) {
                reject(result);
            }
            resolve(result);
        });
    });
    var collectProductList = new Promise(function(resolve, reject) {
        crud.readDatabase("product", function(object,error) {
            if (error) {
                reject(error);
            } 
            else {
                resolve(object);
            }
        });
    });
    Promise.all([collectClient, collectProductList]).then(result => {
        var productName = result[0].productName;
        var productPrice = result[0].productPrice;
        var productImage = result[0].productImage;
        var productList = result[1];
        var token = result[0].token;
        if (token != "token") {
            throw new Error("Authentication Error");
        }
        if (checkValidProduct(productName) || checkPrice(productPrice) || checkFile(productImage)) { 
            throw new Error("Wrong Data Input");
        }
        for (var i = 0; i < productList.length; i++) {
            if (productList[i].name == productName) {
                throw new Error("Wrong Data Input");
            }
        }
        var fileName = utilities.modifyFileName(productImage.fileName);
        for (var i = 0; i < 4; i++) {
            var randomNumber = Math.floor((Math.random() * 10000) + 1);
            randomNumber = randomNumber.toString();
            fileName = randomNumber + "-" + fileName;
        }
        var obj = {};
        obj.name = productName;
        obj.priceInt = productPrice;
        obj.id = productList.length;
        obj.price = displayPrice(productPrice);
        crud.createDocument("product", obj, err => {
            if (err) throw err;
            adminUtilities.savePhoto(obj, fileName, productImage.file, err => {
                if (err) throw err;
                response.end("OK");
            });
        });
    }).catch(error => {
        errorHandler(error,response);
        return;
    });
}

function displayPrice(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) {
        x = x.replace(pattern, "$1,$2");
    }
    return x + " đ";
}


module.exports = {
    checkProductName: checkProductName,
    checkProduct: checkProduct
};

