var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");

module.exports = function productHandler(request, response) {
    crud.readDatabase("product", function(product) {
         utilities.setResponseHeader(response);
        response.end(JSON.stringify(product));
    });
}