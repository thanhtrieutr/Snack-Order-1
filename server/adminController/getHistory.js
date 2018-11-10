var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var errorHandler = require("../errorHandler/controllerError");
var adminModel = require("../schema/admin-account-schema");
var orderModel = require("../schema/order-schema");

function getHistory(request, response) {
    var collectClient = new Promise((resolve, reject) => {
        var result = request.body;
        crud.readOneDocument(adminModel, {token: result.token}, (admin, err) => {
            if (err) {
                reject(err);
            }
            if (typeof(admin) != "object" || admin == null) {
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
            var obj = {}, currentOrder = order[i];
            obj._id = currentOrder._id;
            var tempTime = currentOrder.time;
            obj.time = tempTime.getDate() + "/" + (tempTime.getMonth()+1) + "/" + tempTime.getFullYear();
            obj.user = currentOrder.user.user;
            obj.actualTotalPrice = currentOrder.actualTotalPrice;
            obj.products = [];
            for (var j=0;j<currentOrder.products.length;j++) {
                debugger;
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
        debugger;
        response.end(JSON.stringify(orderList));
    }).catch(error => {
        errorHandler(error,response);
        return;
    });
}
module.exports = {
    getHistory: getHistory
}