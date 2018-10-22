//function for feature
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var errorHandler = require("../errorHandler/controllerError");

function readData(callback) {
    var readProduct = new Promise((resolve, reject) => {
        try {
            crud.readDatabase("product", function(item) {
                resolve(item);
            });
        }
        catch (error) {
            reject(error);
        }
    });
    var readAccount = new Promise((resolve, reject) => {
        try {
            crud.readDatabase("account", function(item) {
                resolve(item);
            });
        }
        catch (error) {
            reject(error);
        }
    });
    
    Promise.all([readProduct, readAccount]).then(result => {
        callback(false, result[0], result[1]);
    }).catch (error => {
        errorHandler(error,response);
        // return;
        callback(error);
    });
}

function submitCart(request, response, product, accountArray) {  
    var readPost = new Promise((resolve, reject) => {
        utilities.collectDataFromPost(request, result => {
            var checkUser = 0;
            var currentUser;
            for (var i in accountArray) {
                let token = accountArray[i].token;                    
                if (result.token == token) {
                    checkUser = 1;
                    currentUser=accountArray[i];
                    break;
                } 
            }
            if (checkUser == 0) {
                reject(new Error("Authentication Error"));
            }
            for (var i in result.cartArray) {
                for (var j in result.cartArray) {
                    if (i != j && result.cartArray[i].productID == result.cartArray[j].productID) {
                        throw new Error ("Wrong Data Input");
                    }
                }
            }
            resolve([currentUser, result]);
        });
    });

    readPost.then((result) => {
        var currentUser = result[0];
        result = result[1];
        var returnBill = {};
        var bill = {};
        bill.time=new Date();
        returnBill.time=new Date();
        bill.user = currentUser._id;
        bill.products = [];
        bill.estimateTotalPrice = 0;
        returnBill.user = currentUser._id;
        returnBill.products = [];
        returnBill.estimateTotalPrice = 0;
        bill.actualTotalPrice = 0;
        var checkProduct = 0;
        for (var i in result.cartArray) {
            checkProduct = 0;
            if (!result.cartArray[i].productID) {
                throw new Error ("Wrong Data Input");
            }
            for (var j in product) {
                // find match 
                if (result.cartArray[i].productID == product[j].id) {
                    checkProduct = 1;
                    // calculate total price
                    var currentPrice = product[j].priceInt;
                    var currentAmount  = result.cartArray[i].amount;
                    if (!currentAmount || typeof currentAmount !== "number" || currentAmount <= 0 || currentAmount >=100)
                    {
                        throw new Error ("Wrong Data Input");
                    }
                    product[j].amount=currentAmount;
                    bill.products.push({_id:product[j]._id,quantity:currentAmount,status:"pending"});
                    returnBill.products.push(product[j]);
                    bill.estimateTotalPrice += currentAmount * currentPrice;
                    returnBill.estimateTotalPrice = bill.estimateTotalPrice;
                }
            }
            if (checkProduct == 0) {
                throw new Error ("Wrong Data Input");
            }
        }
        crud.createDocument("order",bill,error => {
            if (error) throw new Error ("Problem with database");
        });
        
        utilities.setResponseHeader(response);
        console.log(returnBill);
        response.end(JSON.stringify(returnBill));
        return;
    }).catch(error => {
        errorHandler(error,response);
        return;
    });
}
module.exports = function submitCartHandler(request, response) {
    // read data first because they can change
    readData((error, product, account) => {
        if (error) {
            return;
        }
        submitCart(request, response, product, account);
    });
}

///////////////////////////////////////////////////////////////////////////////////////

