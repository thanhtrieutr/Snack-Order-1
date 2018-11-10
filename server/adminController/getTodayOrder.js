var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var errorHandler = require("../errorHandler/controllerError");
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
function createQuery() {
    var todayStart = new Date();
    todayStart.setHours(0,0,0,0);
    var todayEnd = new Date();
    todayEnd.setHours(23,59,59,999);
    //find order (link with account, product) and match with today
    var query =[
        {
            $lookup: { 
                from: 'account',
                localField: 'user',
                foreignField: '_id',
                as: 'userObj'
            }
        },
        {   
            $unwind: "$userObj"
        },
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
                "time": { $gte: todayStart, $lte: todayEnd} 
            }
        },
        {
            $project : {
                userName: "$userObj.user",
                time: 1,
                productArray: 1,
                products: 1
            }
        }
    ];
    return query;
}
function getTodayOrder(request, response) {
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

    collectClient.then(token => {
        return new Promise((resolve, reject) => {
            var query = createQuery();
            crud.readOneDocument(orderModel, query, (result, err) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }).then(order => {
        var orderList = [];
        for (var i in order) {
            var obj = {}, oneOrder = order[i];
            obj.time = `${oneOrder.time.getHours()}:${oneOrder.time.getMinutes()}`;
            obj.user = oneOrder.userName;
            obj.orderId = [oneOrder._id];
            for (var j in oneOrder.products) {
                var j2 = utilities.findObjectById(oneOrder.productArray, oneOrder.products[j]._id);
                var oneProduct = oneOrder.productArray[j2];
                obj.name = oneProduct.name;
                obj.quantity = oneOrder.products[j].quantity;
                obj.price = oneProduct.price;
                obj.status = oneOrder.products[j].status;
                obj.productId = oneOrder.products[j]._id;
                obj.totalPrice = oneProduct.price * obj.quantity;
                //join 
                var position = -1;
                for (var k in orderList) {
                    if (commonProduct(orderList[k], obj)) {
                        position = k; break;
                    }
                }
                if (position == -1) {
                    var newObj = utilities.cloneObject(obj);
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