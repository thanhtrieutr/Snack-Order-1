//function for feature
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var mongo = require('mongodb');
var productModel = require("../schema/product-schema");
var orderModel = require("../schema/order-schema");
var accountModel = require("../schema/account-schema");

function createProductList(oneCart) {
    return new Promise((resolve, reject) => {
        if (!oneCart.productTrueID) {
            reject(new Error("Wrong Data Input"));
        }
        var objId = new mongo.ObjectID(oneCart.productTrueID);
        var obj = { _id: objId };
        crud.readOneDocument(productModel, obj, oneProduct => {
            if (oneProduct == null) {
                reject(new Error("Wrong Data Input"));
            }
            resolve(oneProduct);
        });
    });
}

function submitCart(request, response, next) {
    var readPost = new Promise((resolve, reject) => {
        var result = request.body;
        if (typeof (result) != "object" || result == null) {
            reject(new Error("Wrong Data Input"));
        }
        for (var i in result.cartArray) {
            for (var j in result.cartArray) {
                if (i != j && result.cartArray[i].productID == result.cartArray[j].productID) {
                    reject(new Error("Wrong Data Input"));
                }
            }
        }
        resolve(result);
    });

    readPost.then(result => {
        return new Promise((resolve, reject) => {
            var obj = { token: result.token };
            crud.readOneDocument(accountModel, obj, account => {
                if (account == null) {
                    reject(new Error("Authentication Error"));
                }
                resolve([account, result]);
            });
        });
    }).then((result) => {
        var currentUser = result[0];
        result = result[1];
        var returnBill = {};
        var bill = {};
        bill.time = new Date();
        returnBill.time = new Date();
        bill.user = currentUser._id;
        bill.products = [];
        bill.estimateTotalPrice = 0;
        returnBill.user = currentUser._id;
        returnBill.products = [];
        returnBill.estimateTotalPrice = 0;
        bill.actualTotalPrice = 0;

        var productInOrder = result.cartArray.map(x => createProductList(x));

        Promise.all(productInOrder).then(productList => {
            for (var i in productList) {
                // calculate total price
                var currentPrice = productList[i].price;
                var currentAmount = result.cartArray[i].amount;
                if (!currentAmount || typeof currentAmount !== "number" || currentAmount <= 0 || currentAmount >= 100) {
                    throw new Error("Wrong Data Input");
                }
                productList[i].amount = currentAmount;
                bill.products.push({
                    _id: productList[i]._id,
                    quantity: currentAmount,
                    status: "pending"
                });
                returnBill.products.push(productList[i]);
                bill.estimateTotalPrice += currentAmount * currentPrice;
                returnBill.estimateTotalPrice = bill.estimateTotalPrice;
            }
            crud.createDocument(orderModel, bill, error => {
                if (error) reject(new Error("Problem with database"));
                utilities.setResponseHeader(response);
                console.log(returnBill);
                response.end(JSON.stringify(returnBill));
            });
        }).catch(error => {
            next(error);
        });
    }).catch(error => {
        next(error);
    });
}

module.exports = function submitCartHandler(request, response, next) {
    submitCart(request, response, next);
};
///////////////////////////////////////////////////////////////////////////////////////