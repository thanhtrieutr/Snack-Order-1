var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var adminUtilities = require("../adminController/adminUtilities");
var errorHandler = require("../errorHandler/controllerError");

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
    var collectOrderList = new Promise(function(resolve, reject) {
        crud.readDatabase("order", function(object,error) {
            if (error) {
                reject(error);
            } 
            else {
                resolve(object);
            }
        });
    });
    Promise.all([collectClient, collectOrderList]).then(result => {
        return new Promise((resolve, reject) => {
            var checkAccount = {token: result[0].token};
            crud.readOneDocument("adminAccount", checkAccount, account => {
                if (account == null) {
                    reject( new Error("Authentication Error"));
                }
                resolve(result);
            });
        });
    }).then(result => {
        var orderListDb = result[1];
        var updateList = result[0].updateList;
        var userList = result[0].user;
        if (checkUpdateList(updateList)) {
            throw new Error("Wrong Data Input");
        }
        var temporaryList = init(updateList);
        var orderList = temporaryList.orderList;
        var productList = temporaryList.productList;
        var statusList = temporaryList.statusList;
        var userList = temporaryList.userList;
        for (var i in orderListDb) {
            var currentOrder = orderListDb[i];
            var position = orderList.indexOf(currentOrder._id.toString());
            if (position != -1) {
                var currentProductList = currentOrder.products;
                for (var j in currentProductList) {
                    var productPosition = productList[position].indexOf(currentProductList[j]._id.toString() + '-' + userList[position]);
                    if (productPosition != -1) {
                        currentProductList[j].status = statusList[position][productPosition];
                    }
                }
                crud.updateOneDocument("order", {_id:currentOrder._id}, currentOrder, err => {
                    if (err) throw err;
                });
            }       
        }   
        response.end("Success");
    }).catch(error => {
        errorHandler(error,response);
        return;
    });
}

module.exports = {
    changeStatus: changeStatus,
};
