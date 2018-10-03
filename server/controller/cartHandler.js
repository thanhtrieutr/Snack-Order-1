//function for feature
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var product;
crud.readDatabase("product", function(item) {
    product = item;
});
crud.readDatabase("account", function(item) { 
    accountArray  = item;
});

module.exports = function submitCartHandler(request, response) {
    utilities.collectDataFromPost(request, result => {
        var position = utilities.findValidUserPosition(accountArray, result);
        if (position == -1) {
            utilities.setResponseHeader(response);
            response.end("Fail"); 
            return;
        }
        else {
            var bill = {};
            bill.products = [];
            bill.totalPrice = 0;  
            var checkProduct = 0;
            for (var i in result.cartArray) {
                for (var j in result.cartArray) {
                    if (i != j && result.cartArray[i].productID == result.cartArray[j].productID) {
                        utilities.setResponseHeader(response);
                        response.end("Fail");
                        return;
                    }
                }
            }
            for (var i in result.cartArray) {
                checkProduct = 0;
                if (!result.cartArray[i].productID) {
                    utilities.setResponseHeader(response);
                    response.end("Fail");
                    return; 
                }
                for (var j in product) {
                    // find match 
                    if (result.cartArray[i].productID == product[j].id) {
                        checkProduct = 1;
                        bill.products.push(product[j]);
                        // calculate total price
                        var currentPrice = product[j].priceInt;
                        var currentAmount  = result.cartArray[i].amount;
                        if (!currentAmount || typeof currentAmount !== "number" || currentAmount <= 0 || currentAmount >=100)
                        {
                            utilities.setResponseHeader(response);
                            response.end("Fail");
                            return;
                        }
                        bill.totalPrice += currentAmount * currentPrice;
                    }
                }
                if (checkProduct == 0) {
                    utilities.setResponseHeader(response);
                    response.end("Fail");
                    return;
                }
            }
            utilities.setResponseHeader(response);
            response.end(JSON.stringify(bill));
            return;
        }
    });
}

///////////////////////////////////////////////////////////////////////////////////////

