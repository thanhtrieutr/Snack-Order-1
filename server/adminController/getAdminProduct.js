var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var errorHandler = require("../errorHandler/controllerError");

function getAdminProduct(request, response) {
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
        debugger
        var token = result[0].token;
        var products = result[1];
        if (token != "token")
            throw new Error("Authentication Error");
        response.end(JSON.stringify(products));
    }).catch(error => {
        errorHandler(error,response);
        return;
    });
}

module.exports = {
    getAdminProduct: getAdminProduct
};