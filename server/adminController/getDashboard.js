var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var adminModel = require("../schema/admin-account-schema");
var orderModel = require("../schema/order-schema");

function commonProduct(a, b) {
    if (a.productId.equals(b.productId) && a.user == b.user && a.status == b.status) {
        return true;
    }
    return false;
}

function getMax(a, b) {
    if (a >= b) {
        return a;
    }
    return b;
}

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
        result.orderCount = order.length;
        result.budgetRequire = 0;
        result.currentSpending = 0;
        result.mostBought = "Dummy data";
        result.monthSpend = 0;

        for (var i = 0; i<order.length; i++) {
            result.budgetRequire += (order[i].estimateTotalPrice - order[i].actualTotalPrice );
            result.currentSpending += order[i].actualTotalPrice;
        }
        response.end(JSON.stringify(result));
        // var orderList = [];
        // for (var i = 0; i < order.length; i++) {
        //     var obj = {}, oneOrder = order[i];
        //     obj.time = `${oneOrder.time.getHours()}:${oneOrder.time.getMinutes()}`;
        //     obj.user = oneOrder.user.user;
        //     obj.orderId = [oneOrder._id];
        //     for (var j = 0; j < oneOrder.products.length; j++) {
        //         obj.name = oneOrder.products[j]._id.name;
        //         obj.quantity = oneOrder.products[j].quantity;
        //         obj.price = oneOrder.products[j]._id.price;
        //         obj.status = oneOrder.products[j].status;
        //         obj.productId = oneOrder.products[j]._id._id;
        //         obj.totalPrice = obj.price * obj.quantity;
        //         //join 
        //         var position = -1;
        //         for (var k in orderList) {
        //             if (commonProduct(orderList[k], obj)) {
        //                 position = k;
        //                 break;
        //             }
        //         }
        //         if (position == -1) {
        //             var newObj = utilities.cloneObject(obj);
        //             orderList.push(newObj);
        //         } else {
        //             orderList[k].quantity += obj.quantity;
        //             orderList[k].totalPrice += obj.totalPrice;
        //             orderList[k].time = getMax(orderList[k].time, obj.time);
        //             orderList[k].orderId = orderList[k].orderId.concat(obj.orderId);
        //         }
        //     }
        // }
        // response.end(JSON.stringify(orderList));
    }).catch(error => {
        next(error);
    });
}

module.exports = {
    getDashboard:  getDashboard
};