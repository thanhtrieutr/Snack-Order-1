var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var adminModel = require("../schema/admin-account-schema");
var orderModel = require("../schema/order-schema");

function getHistory(request, response, next) {
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

    collectClient.then(result => {
        return new Promise((resolve, reject) => {
            crud.getOrders(orderModel, {}, (result, err) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }).then(order => {
        var orderList = [];
        for (var i in order) {
            var obj = {},
                currentOrder = order[i];
            obj._id = currentOrder._id;
            var tempTime = currentOrder.time;
            obj.time = tempTime.getDate() + "/" + (tempTime.getMonth()+1) + "/" + tempTime.getFullYear();
            obj.user = currentOrder.user.user;
            obj.actualTotalPrice = currentOrder.actualTotalPrice;
            obj.products = [];
            for (var j = 0 ; j < currentOrder.products.length; j++) {
                var newObj = {};
                newObj.quantity = currentOrder.products[j].quantity;
                newObj.status = currentOrder.products[j].status;
                newObj.name = currentOrder.products[j]._id.name;
                newObj.price = currentOrder.products[j]._id.price;
                newObj.totalPrice = newObj.price * newObj.quantity;
                newObj._id=currentOrder.products[j]._id._id;
                obj.products.push(newObj);
            }
            var newObj = utilities.cloneObject(obj);
            orderList.push(newObj);
        }
        response.end(JSON.stringify(orderList));
    }).catch(error => {
        next(error);
    });
}

module.exports = {
    getHistory: getHistory
};