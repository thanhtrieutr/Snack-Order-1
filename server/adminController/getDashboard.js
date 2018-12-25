var crud = require("../utilities/databaseCRUD");
var adminModel = require("../schema/admin-account-schema");
var productModel = require("../schema/product-schema");
var orderModel = require("../schema/order-schema");

function getDashboard(request, response, next) {
    var collectClient = new Promise((resolve, reject) => { 
        var result = request.body;
        crud.readOneDocument(adminModel, {token: result.token}, (admin, err) => {
            if (err) {
                reject(err);
            }
            if (typeof (admin) != "object" || admin == null) {
                reject(new Error("Authentication Error"));
            }
            resolve();
        });
    });

    collectClient.then(token => {
        return new Promise((resolve, reject) => {
            var todayStart = new Date();
            todayStart.setHours(0,0,0,0);
            var todayEnd = new Date();
            todayEnd.setHours(23,59,59,999);
            var condition = {time: {$gte: todayStart, $lte: todayEnd}};
            crud.getOrders(orderModel, condition, (result, err) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }).then(order => {
        var result={};
        var item = [];
        var quantity = [];
        var position = -1;
        var mostBoughtItem = "None";
        var mostBoughtQuantity = 0;
        result.orderCount = order.length;
        result.budgetRequire = 0;
        result.currentSpending = 0;
        result.mostBought = "Dummy data";
        result.monthSpend = 0;

        debugger;
        for (var i = 0; i < order.length; i++) {
            result.budgetRequire += (order[i].estimateTotalPrice - order[i].actualTotalPrice );
            result.currentSpending += order[i].actualTotalPrice;
            for (var j = 0; j < order[i].products.length; j++) {
                position = item.indexOf(order[i].products[j]._id);
                if (position == -1) {
                    item.push(order[i].products[j]._id);
                    quantity.push(order[i].products[j].quantity);
                }
                else {
                    quantity[position] += order[i].products[j].quantity;
                }
            }
        }

        for (var i = 0; i < item.length ;i++) {
            if (quantity[i] > mostBoughtQuantity) {
                mostBoughtQuantity = quantity[i];
                mostBoughtItem = item[i];
            }
        }

        if (mostBoughtItem != "None") {
            result.mostBought = mostBoughtItem.name;
        }
        
        response.end(JSON.stringify(result));
    }).catch(error => {
        next(error);
    });
}

module.exports = {
    getDashboard:  getDashboard
};