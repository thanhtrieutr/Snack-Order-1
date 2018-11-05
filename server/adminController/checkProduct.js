var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var adminUtilities = require("../adminController/adminUtilities");
var errorHandler = require("../errorHandler/controllerError");
var mongo = require('mongodb');

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
    if (fileName == false) {
        return true;
    }
    return false;
}


function checkProductName(request, response) {
    var collectClient = new Promise((resolve, reject) => { 
        var result = request.body;
        if (result instanceof Error) {
            reject(result);
        }
        resolve(result);
    });
    Promise.all([collectClient]).then(result => {
        return new Promise((resolve, reject) => {
            var obj = {token : result[0].token};
            crud.readOneDocument("adminAccount", obj, account => {
                if (account == null) {
                    reject( new Error("Authentication Error"));
                }
                resolve(result);
            });
        });
    }).then(result => {
        if (checkValidProduct(result[0].productName)) {
            throw new Error("Wrong Data Input");
        } 
        var obj = {name: result[0].productName};
        crud.readOneDocument("product", obj, function(product, error) {
            if (error) {
                throw rerror;
            }
            //check conflict
            if (product != null) {
                throw new Error("Wrong Data Input");
            }
            response.end("OK"); 
        });
    }).catch(error => {
        errorHandler(error,response);
        return;
    });
}

function checkProduct(request, response) {
    var collectClient = new Promise((resolve, reject) => { 
        var result = request.body;
        if (result instanceof Error) {
            reject(result);
        }
        resolve(result);
    });

    Promise.all([collectClient]).then(result => {
        return new Promise((resolve, reject) => {
            var obj = {token : result[0].token};
            crud.readOneDocument("adminAccount", obj, account => {
                if (account == null) {
                    reject( new Error("Authentication Error"));
                }
                resolve(result);
            });
        });
    }).then(result => {
        if (checkValidProduct(result[0].productName)) {
            throw new Error("Wrong Data Input");
        } 
        var obj = {name: result[0].productName};
        crud.readOneDocument("product", obj, function(product, error) {
            if (error) {
                throw error;
            }
            //check conflict
            if (product != null) {
                throw new Error("Wrong Data Input");
            }
            var productName = result[0].productName;
            var productPrice = result[0].productPrice;
            var productImage = result[0].productImage;
            var fileName = utilities.modifyFileName(productImage.fileName);
            for (var i = 0; i < 4; i++) {
                var randomNumber = Math.floor((Math.random() * 10000) + 1);
                randomNumber = randomNumber.toString();
                fileName = randomNumber + "-" + fileName;
            }
            var obj = {};
            obj.name = productName;
            obj.price = productPrice;
            crud.createDocument("product", obj, err => {
                if (err) throw err;
                adminUtilities.savePhoto(obj, fileName, productImage.file, err => {
                    if (err) throw err;
                    response.end("OK");
                });
            });
        });
    }).catch(error => {
        errorHandler(error,response);
        return;
    });
}
function updateProduct(request,response){
    var collectClient = new Promise((resolve, reject) => { 
        var result = request.body;
        if (result instanceof Error) {
            reject(result);
        }
        if (typeof(result) != "object" || result == null) {
            reject(new Error ("Wrong Data Input"));
        }
        resolve(result);
    });
    collectClient.then(result => {
        return new Promise((resolve, reject) => {
            var obj = {token : result.token};
            crud.readOneDocument("adminAccount", obj, account => {
                if (account == null) {
                    reject( new Error("Authentication Error"));
                }
                resolve(result);
            });
        });
    }).then(result => {
        return new Promise((resolve, reject) => {
            var objId = new mongo.ObjectID(result.id);
            var obj = {_id: objId};
            crud.readOneDocument("product", obj, function(product, error) {
                if (error) {
                    reject(error);
                }
                if (product == null) {
                    reject(new Error("Wrong Data Input"));
                }
                resolve([result, product]);
            });
        });
    }).then(result => {
        var productPrice = result[0].productPrice;
        var productImage = result[0].productImage;
        var currentProduct = result[1];
        if (productPrice) {
            if (checkPrice(productPrice)) {
                throw new Error("Wrong Data Input");
            }
            var obj = {};
            obj.price = productPrice;
            console.log(currentProduct._id);
            crud.updateOneDocument("product", {_id:currentProduct._id}, obj, err => {
                if (err) throw err;
            });
        }
        if (productImage) {
            if (checkFile(productImage)) {
                throw new Error("Wrong Data Input");
            }
            var fileName = utilities.modifyFileName(productImage.fileName);
            for (var i = 0; i < 4; i++) {
                var randomNumber = Math.floor((Math.random() * 10000) + 1);
                randomNumber = randomNumber.toString();
                fileName = randomNumber + "-" + fileName;
            }
            adminUtilities.savePhoto({_id:currentProduct._id}, fileName, productImage.file, err => {
                if (err) throw err;
            });
        }
        utilities.setResponseHeader(response);
        response.end("OK");
    }).catch(error => {
        errorHandler(error,response);
        return;
    });
}

function displayPrice(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) {
        x = x.replace(pattern, "$1.$2");
    }
    return x + " đ";
}


module.exports = {
    checkProductName: checkProductName,
    checkProduct: checkProduct,
    updateProduct: updateProduct
};

