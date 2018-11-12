var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var adminUtilities = require("../adminController/adminUtilities");
var errorHandler = require("../errorHandler/controllerError");
var mongo = require('mongodb');
var productModel = require("../schema/product-schema");
var adminModel = require("../schema/admin-account-schema");
var express = require('express');
var multer = require('multer');
var appUpdateProduct = express();
var path = require('path');
var appAddProduct = express();

//save to disk at image folder
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, '../../images'));
    },
    filename: function (req, file, callback) {
        req.newFileName = utilities.modifyFileName(file.originalname);
        callback(null, req.newFileName);
    }
})

//receive + parse (by multer) uploaded file
var upload = multer({storage: storage, fileFilter: utilities.fileFilter}).single('file');
var uploadFile = function(request, response, next) {
    upload(request, response, function (err) {
        if (err instanceof multer.MulterError) {
          errorHandler(err, response);
          return;
        } else if (err) {
            errorHandler(err, response);
            return;
        }
        next();
    })
}

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
    if (isNaN(productPrice)) {
        return true;
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

//check valid name product
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
            crud.readOneDocument(adminModel, obj, account => {
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
        crud.readOneDocument(productModel, obj, function(product, error) {
            try {
                if (error) {
                    throw error;
                }
                //check conflict
                if (product != null) {
                    throw new Error("Wrong Data Input");
                }
                response.end("OK");
            }
            catch (error) {
                errorHandler(error,response);
                return;
            } 
        });
    }).catch(error => {
        errorHandler(error,response);
        return;
    });
}

//create new product (productName, productPrice, productImage, token)
appAddProduct.post('/', adminUtilities.authenticationAdminByHeader, uploadFile, (request, response) => {
    var productName = request.body.productName;
    var productPrice = request.body.productPrice;
    var productImageLink = request.newFileName;

    if (checkValidProduct(productName) || checkPrice(productPrice)) {
        errorHandler(new Error("Wrong Data Input"),response);
        return;
    } 

    //find conflict product
    var collectProduct = new Promise((resolve, reject) => {
        var obj = {name: productName};
        crud.readOneDocument(productModel, obj, function(product, error) {
            if (error) {
                reject(error);
            }
            if (product != null) {
                reject(new Error("Wrong Data Input"));
            }
            resolve();
        });
    });
    //add product
    collectProduct.then(() => {
        var obj = {};
        obj.name = productName;
        obj.price = productPrice;
        obj.img = '/static/images/' + productImageLink;
        crud.createDocument(productModel, obj, error => {
            if (error) {
                errorHandler(error,response);
                return;
            }
            response.end("OK");
        });
    }).catch(error => {
        errorHandler(error,response);
        return;
    });
});
//update Product (productID, productImage, productPrice, token)
appUpdateProduct.post('/image', adminUtilities.authenticationAdminByHeader, uploadFile, (request, response) => {
    var productID = request.body.productID;
    var productImageLink = request.newFileName;

    //find product by product Id 
    var collectProduct = new Promise((resolve, reject) => {
        var objID = new mongo.ObjectID(productID);
        var obj = {_id: objID};
        crud.readOneDocument(productModel, obj, function(product, error) {
            if (error) {
                reject(error);
            }
            if (product == null) {
                reject(new Error("Wrong Data Input"));
            }
            resolve(product);
        });
    });
    //update link image of product at mongodb
    collectProduct.then(currentProduct => {
        var avatarValue = {
            img: '/static/images/' + productImageLink
        };
        crud.updateOneDocument(productModel, {_id: currentProduct._id}, avatarValue, function(err) {
            if (err) {
                errorHandler(err,response);
                return;
            }
            utilities.setResponseHeader(response);
            response.end("OK");
        });
    }).catch(error => {
        errorHandler(error,response);
        return;
    });
});

appUpdateProduct.post('/price', adminUtilities.authenticationAdminByHeader, utilities.jsonParser(), (request, response) =>{
    var productPrice = request.body.productPrice;
    var productID = request.body.id;
    if (checkPrice(productPrice)) {
        errorHandler(new Error("Wrong Data Input"),response);
        return;
    }

    //find product by product Id 
    var collectProduct = new Promise((resolve, reject) => {
        var objID = new mongo.ObjectID(productID);
        var obj = {_id: objID};
        crud.readOneDocument(productModel, obj, function(product, error) {
            if (error) {
                reject(error);
            }
            if (product == null) {
                reject(new Error("Wrong Data Input"));
            }
            resolve(product);
        });
    });

    //update price of product at mongodb
    collectProduct.then(currentProduct => {
        var obj = {};
        obj.price = productPrice;
        console.log(currentProduct._id);
        crud.updateOneDocument(productModel, {_id:currentProduct._id}, obj, err => {
            if (err) {
                errorHandler(error,response);
                return;
            }
            utilities.setResponseHeader(response);
            response.end("OK");
        });
    }).catch(error => {
        errorHandler(error,response);
        return;
    });
    
});

module.exports = {
    checkValidProduct: checkValidProduct,
    checkPrice: checkPrice,
    checkFile: checkFile,
    checkProductName: checkProductName,
    addProduct: appAddProduct,
    updateProduct: appUpdateProduct
};

