//function for feature
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var errorHandler = require("../errorHandler/controllerError");

var product, accountArray;
function readData(callback) {
    try{
        crud.readDatabase("product", function(item) {
            product = item;
            crud.readDatabase("account", function(item) { 
                accountArray  = item;
                if (callback) callback();
            });
        });
    }
    catch (error) {
        errorHandler(error,response);
        // return;
        callback(error);
    }
}

function submitCart(request, response) {
    utilities.collectDataFromPost(request, result => {
        var checkUser = 0;
        var currentUser;
        for (var i in accountArray) {
            let token = accountArray[i].token;
            if (result.token == token) {
                checkUser = 1;
                currentUser = accountArray[i].user;
            } 
        }
        if (checkUser == 0) {
            utilities.setResponseHeader(response);
            response.end("Fail");
            return;
        }
        var bill = {};
        bill.user = currentUser;
        bill.products = [];
        bill.totalPrice = 0;  
        var checkProduct = 0;
        for (var i in result.cartArray) {
            for (var j in result.cartArray) {
                if (i != j && result.cartArray[i].productID == result.cartArray[j].productID) {
                    utilities.setResponseHeader(response);
                    response.end("Fail");
                    return;
    try {
        utilities.collectDataFromPost(request, result => {
            try {
                var checkUser = 0;
                var currentUser;
                for (var i in accountArray) {
                    let token = Buffer.from(accountArray[i].user).toString('base64');
                    if (result.token == token) {
                        checkUser = 1;
                        currentUser = accountArray[i].user;
                    } 
                }
                if (checkUser == 0) {
                    throw new Error("Authentication Error");
                }
                var bill = {};
                bill.user = currentUser;
                bill.products = [];
                bill.totalPrice = 0;  
                var checkProduct = 0;
                for (var i in result.cartArray) {
                    for (var j in result.cartArray) {
                        if (i != j && result.cartArray[i].productID == result.cartArray[j].productID) {
                            throw new Error ("Wrong Data Input");
                        }
                    }
                }
                for (var i in result.cartArray) {
                    checkProduct = 0;
                    if (!result.cartArray[i].productID) {
                        throw new Error ("Wrong Data Input");
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
                                throw new Error ("Wrong Data Input");
                            }
                            bill.totalPrice += currentAmount * currentPrice;
                        }
                    }
                    if (checkProduct == 0) {
                        throw new Error ("Wrong Data Input");
                    }
                }
                utilities.setResponseHeader(response);
                response.end(JSON.stringify(bill));
                return;
            }
            catch (error) {
                errorHandler(error,response);
                return;
            }
        });
    }
    catch (error) {
        errorHandler(error,response);
        return;
    }
    
}
module.exports = function submitCartHandler(request, response) {
    // read data first because they can change
    readData((error) => {
        if (error) {
            return;
        }
        submitCart(request, response);
    });
}

///////////////////////////////////////////////////////////////////////////////////////

