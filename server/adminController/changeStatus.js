var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var mongo = require('mongodb');
var orderModel = require("../schema/order-schema");
var adminModel = require("../schema/admin-account-schema");

function checkUpdateList(updateList) {
    if (!updateList || updateList.length == 0) {
        return true;
    }
    for (var i = 0; i < updateList.length; i++ ) {
        var oneUpdate = updateList[i];
        var status = oneUpdate.status;
        if (!oneUpdate.productId || !oneUpdate.orderId || !status) 
            return true;
        if (status != "accept" && status != "pending" && status != "reject") 
            return true;
    }
    return false;
}
//seperate group to order and its products
function init(updateList) {
    var orderList = [];
    var productList = [];
    var statusList = [];
    var userList = [];
    for (var i in updateList) {
        var currentList = updateList[i].orderId;
        for (var j in currentList) {
            if (orderList.indexOf(currentList[j]) == -1) {
                orderList.push(currentList[j]);
                userList.push(updateList[i].user);
                productList.push([]);
                statusList.push([]);
            }
            var position = orderList.indexOf(currentList[j]);
            productList[position].push(updateList[i].productId);
            statusList[position].push(updateList[i].status);
        }
    }
    var combineList = {};
    combineList.userList = userList;
    combineList.orderList = orderList;
    combineList.productList = productList;
    combineList.statusList = statusList;
    return combineList;
}

function createPromiseChange(order, productList, statusList) {
    return new Promise((resolve, reject) => {
        crud.getOrders(orderModel,{_id:order}, (result,err) => {
            oneOrder = result[0];
            var actualTotalPrice = 0;
            if (oneOrder == null) {
                reject(new Error ("Wrong Data Input"));
            }
            for (var i=0;i<oneOrder.products.length;i++) {
                var productId = oneOrder.products[i]._id._id.toString();
                var productPosition = productList.indexOf(productId);
                if (productPosition == -1) {
                    reject(new Error ("Wrong Data Input"));
                }
                //change status
                // var i2 = utilities.findObjectById(oneOrder.products, oneOrder.products[i]._id._id);
                oneOrder.products[i].status = statusList[productPosition];
                if (oneOrder.products[i].status == "accept") {
                    actualTotalPrice += oneOrder.products[i].quantity * oneOrder.products[i]._id.price;
                }
            }
            oneOrder.actualTotalPrice = actualTotalPrice;
            resolve(oneOrder);
        });
    });
}
function createPromiseUpdate(oneOrder) {
    return new Promise((resolve, reject) => {
        crud.updateOneDocument(orderModel, {_id: oneOrder._id}, oneOrder, err => {
            if (err) reject(err);
            resolve();
        });
    });
}
function changeStatus(request,response, next){
    var collectClient = new Promise((resolve, reject) => { 
        var result = request.body;
        if (result instanceof Error) {
            reject(result);
        }
        if (typeof(result) != "object" || result == null) {
            reject(new Error ("Wrong Data Input"));
        }
        resolve(result);
    });
    collectClient.then(result => {
        //console.log(result);
        var updateList = result.updateList;
        if (checkUpdateList(updateList)) {
            throw new Error("Wrong Data Input");
        }
        var temporaryList = init(updateList);
        var orderList = temporaryList.orderList;
        var productList = temporaryList.productList;
        var statusList = temporaryList.statusList;
        var changeStatusPromise = [];
        for (var i in orderList) {
            changeStatusPromise.push(createPromiseChange(orderList[i], productList[i], statusList[i]));
        }
        Promise.all(changeStatusPromise).then(result => {
            var updatePromise = [];
            for (var i in result) {
                updatePromise.push(createPromiseUpdate(result[i]));
            }
            Promise.all(updatePromise).then(result => {
                response.end("Success");
            }).catch(error => {
                next(error);
            });
        }).catch(error => {
            next(error);
        });
    }).catch(error => {
        next(error);
    });
}

module.exports = {
    changeStatus: changeStatus,
};
