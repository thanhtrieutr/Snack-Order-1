var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var errorHandler = require("../errorHandler/controllerError");


module.exports = function productHandler(request, response) {
    try{
        crud.readDatabase("product", function(product) {
            utilities.setResponseHeader(response);
           response.end(JSON.stringify(product));
       });
    }
    catch (error) {
        errorHandler(error,response);
        return;
    }
}