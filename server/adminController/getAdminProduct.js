var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var productModel = require("../schema/product-schema");
var adminModel = require("../schema/admin-account-schema");

function getAdminProduct(request, response, next) {
    var collectClient = new Promise((resolve, reject) => {
        result = request.body;
        if (result instanceof Error) {
            reject(result);
        }
        if (typeof(result) != "object" || result == null) {
            reject(new Error ("Wrong Data Input"));
        }
        resolve(result);
    });
    var collectProductList = new Promise(function(resolve, reject) {
        crud.readDatabase(productModel, function(object,error) {
            if (error) {
                reject(error);
            } 
            resolve(object);
        });
    });
    Promise.all([collectClient, collectProductList]).then(result => {
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
        var products = result[1];
        response.json({
            success: true,
            products: products,
        });
    }).catch(error => {
        next(error);
    });
}

module.exports = {
    getAdminProduct: getAdminProduct
};