//function for feature
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var product;
crud.readDatabase("product", function(item) {
    product = item;
});

module.exports = function submitCartHandler(request, response) {
    utilities.collectDataFromPost(request, result => {
        var bill = {};
        bill.products = [];
        bill.totalPrice = 0;
        
        for (var i in result.cartArray) {
            for (var j in product) {
                // find match 
                if (result.cartArray[i].productID == product[j].id) {
                    bill.products.push(product[j]);
                    // calculate total price
                    var currentPrice = product[j].priceInt;
                    var currentAmount  = result.cartArray[i].amount;
                    bill.totalPrice += currentAmount * currentPrice;
                    break;
                }
            }
        }
        utilities.setResponseHeader(response);
        response.end(JSON.stringify(bill));
    });
}

///////////////////////////////////////////////////////////////////////////////////////

