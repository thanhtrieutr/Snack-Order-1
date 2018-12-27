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
        const { page, perPage } = request.query;
        const options = {
            page: parseInt(page, 10),
            limit: parseInt(perPage, 10)
        }
        productModel.paginate({}, options, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
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
        response.json({
            success: true,
            products: result[1].docs,
            totalPages: result[1].totalPages,
        });
    }).catch(error => {
        next(error);
    });
}

function getOneProduct(request, response , next) {
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
    collectClient.then((result) => {
        obj = { _id : result.id };
        crud.readOneDocument(productModel, obj, product => {
            if (product == null) {
                response.json({
                    success: false,
                });
            }
            response.json({
                product: product,
                success: true,
            });
        });
    }).catch((err) => {
        next(err);
    })
}

module.exports = {
    getAdminProduct: getAdminProduct,
    getOneProduct: getOneProduct
};