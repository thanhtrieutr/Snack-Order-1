var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var errorHandler = require("../errorHandler/controllerError");
// var productList = [
//     {name: "Snack something", amount: 2, price: "19.000đ", totalPrice: "38.000đ", user: "HuuDuc", state: "In progress"},
//     {name: "Snack something", amount: 2, price: "19.000đ", totalPrice: "38.000đ", user: "HuuDuc", state: "In progress"},
//     {name: "Snack something", amount: 2, price: "19.000đ", totalPrice: "38.000đ", user: "HuuDuc", state: "In progress"},
//     {name: "Snack something", amount: 2, price: "19.000đ", totalPrice: "38.000đ", user: "HuuDuc", state: "In progress"},
//     {name: "Snack something", amount: 2, price: "19.000đ", totalPrice: "38.000đ", user: "HuuDuc", state: "In progress"}
// ];
function clone(obj) {
    if (null == obj || "object" != typeof obj) {
        return obj;
    }
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

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
function getTodayOrder(request, response) {
    //in future will receive token of admin
    var collectClient = new Promise((resolve, reject) => { 
        try {
            utilities.collectDataFromPost(request, result => {
                crud.readOneDocument("adminAccount", {token: result.token}, (admin, err) => {
                    if (err) {
                        reject(err);
                    }
                    if (!admin || admin.token != result.token) {
                        reject(new Error("Authentication Error"));
                    }
                    resolve({token: "token"});
                });
            });
        }
        catch (error) {
            reject(error);
            return;
        }
    });
    var collectAccount = new Promise((resolve, reject) => {
        try {
            crud.readDatabase("account", result => {
                resolve(result);
            })
        }
        catch (error) {
            reject(error);
            return;
        }
    });
    var collectProduct = new Promise((resolve, reject) => {
        try {
            crud.readDatabase("product", result => {
                resolve(result);
            })
        }
        catch (error) {
            reject(error);
            return;
        }
    });
    var collectOrderList = new Promise((resolve, reject) => {
        try {
            var todayStart = new Date();
            todayStart.setHours(0,0,0,0);
            var todayEnd = new Date();
            todayEnd.setHours(23,59,59,999);
            var query = { "time": { $gte: todayStart, $lte: todayEnd} };
            crud.readSomeDocument("order", query, (result, err) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        }
        catch (error) {
            reject(error);
            return;
        }
    });
    Promise.all([collectClient, collectOrderList, collectAccount, collectProduct]).then(result => {
        var token = result[0].token, order = result[1], account = result[2], product = result[3];
        var orderList = [];
        if (token != "token")
            throw new Error("Authentication Error");
        for (var i in order) {
            var obj = {}, oneOrder = order[i];
            obj.time = `${oneOrder.time.getHours()}:${oneOrder.time.getMinutes()}`;
            var position = utilities.findObjectById(account, oneOrder.user);
            obj.user = account[position].user;
            obj.orderId = [oneOrder._id];
            for (var j in oneOrder.products) {
                var position = utilities.findObjectById(product, oneOrder.products[j]._id);
                var oneProduct = product[position];
                obj.name = oneProduct.name;
                obj.quantity = oneOrder.products[j].quantity;
                obj.price = oneProduct.price;
                obj.status = oneOrder.products[j].status;
                obj.productId = oneOrder.products[j]._id;
                obj.totalPrice = oneProduct.priceInt * obj.quantity;
                //join 
                position = -1;
                for (var k in orderList) {
                    if (commonProduct(orderList[k], obj)) {
                        position = k; break;
                    }
                }
                if (position == -1) {
                    var newObj = clone(obj);
                    orderList.push(newObj);
                }
                else {
                    orderList[k].quantity += obj.quantity;
                    orderList[k].totalPrice += obj.totalPrice;
                    orderList[k].time = getMax(orderList[k].time, obj.time);
                    orderList[k].orderId = orderList[k].orderId.concat(obj.orderId); 
                }
            }
        }
        response.end(JSON.stringify(orderList));
    }).catch(error => {
        errorHandler(error,response);
        return;
    });
}

module.exports = {
    getTodayOrder: getTodayOrder
};