var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var adminUtilities = require("../adminController/adminUtilities");
var errorHandler = require("../errorHandler/controllerError");
var mongo = require('mongodb');
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
function createQueryOrder(orderId) {
    var query = [
        {
            $lookup: {
                from: 'product',
                localField: 'products._id',
                foreignField: '_id',
                as: 'productArray'
            }
        },
        {
            $match:{ 
                _id: orderId
            }
        },
        {
            $project : {
                productArray: 1,
                products: 1,
                actualTotalPrice: 1
            }
        }
    ];
    return query;
}
function createPromiseChange(order, productList, statusList) {
    return new Promise((resolve, reject) => {
        var objId = new mongo.ObjectID(order);
        var query = createQueryOrder(objId);
        crud.readWithLink("order", query, oneOrder => {
            oneOrder = oneOrder[0];
            var actualTotalPrice = 0;
            if (oneOrder == null) {
                reject(new Error ("Wrong Data Input"));
            }
            for (var i in oneOrder.products) {
                var productId = oneOrder.products[i]._id.toString();
                var productPosition = productList.indexOf(productId);
                if (productPosition == -1) {
                    reject(new Error ("Wrong Data Input"));
                }
                //change status
                oneOrder.products[i].status = statusList[productPosition];
                if (oneOrder.products[i].status == "accept") {
                    actualTotalPrice += oneOrder.products[i].quantity * oneOrder.productArray[i].priceInt;
                }
            }
            oneOrder.actualTotalPrice = actualTotalPrice;
            resolve(oneOrder);
        });
    });
}
function createPromiseUpdate(oneOrder) {
    return new Promise((resolve, reject) => {
        crud.updateOneDocument("order", {_id: oneOrder._id}, oneOrder, err => {
            if (err) throw err;
            resolve();
        });
    });
}
function changeStatus(request,response){
    var collectClient = new Promise((resolve, reject) => { 
        utilities.collectDataFromPost(request, result => {
            if (result instanceof Error) {
                reject(result);
            }
            if (typeof(result) != "object" || result == null) {
                reject(new Error ("Wrong Data Input"));
            }
            resolve(result);
        });
    });
    collectClient.then(result => {
        return new Promise((resolve, reject) => {
            var checkAccount = {token: result.token};
            crud.readOneDocument("adminAccount", checkAccount, account => {
                if (account == null) {
                    reject( new Error("Authentication Error"));
                }
                resolve(result);
            });
        });
    }).then(result => {
        //console.log(result);
        var updateList = result.updateList;
        if (checkUpdateList(updateList)) {
            reject(new Error("Wrong Data Input"));
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
                errorHandler(error,response);
                return;
            });
        }).catch(error => {
            errorHandler(error,response);
            return;
        });
    }).catch(error => {
        errorHandler(error,response);
        return;
    });
}

module.exports = {
    changeStatus: changeStatus,
};
