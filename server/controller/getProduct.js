var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var product;
crud.readDatabase("product", function(item) {
    product = item;
});

module.exports = function productHandler(request, response) {
    utilities.setResponseHeader(response);
    response.end(JSON.stringify(product));
}