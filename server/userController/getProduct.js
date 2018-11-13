var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var productModel = require("../schema/product-schema");

module.exports = function productHandler(request, response, next) {
    var promise1 = new Promise(function (resolve, reject) {
        crud.readDatabase(productModel, function (object, error) {
            if (error) {
                reject(error);
            }
            resolve(object);
        });
    });

    promise1.then(result => {
            utilities.setResponseHeader(response);
            response.end(JSON.stringify(result));
        })
        .catch(error => {
            next(error);
        });
};