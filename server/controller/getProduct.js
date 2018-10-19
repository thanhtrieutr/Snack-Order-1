var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var errorHandler = require("../errorHandler/controllerError");


module.exports = function productHandler(request, response) {

    var promise1 = new Promise(function(resolve, reject) {
        crud.readDatabase("product", function(object,error) {
            if (error) {
                reject(error);
            } 
            else {
                resolve(object);
            }
        });
    });

    promise1.then(result => {
        utilities.setResponseHeader(response);
        response.end(JSON.stringify(result));
    })
    .catch (error => {
        errorHandler(error,response);
    });
}