var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var errorHandler = require("../errorHandler/controllerError");
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
        utilities.collectDataFromPost(request, result => {
            crud.readOneDocument("adminAccount", {token: result.token}, (admin, err) => {
                if (result instanceof Error) {
                    reject(result);
                }
                if (typeof(result) != "object" || result == null) {
                    reject(new Error("Authentication Error"));
                }
                resolve();
            });
        });
    });

    collectClient.then(result => {
        return new Promise((resolve, reject) => {
            var query = createQuery();
            crud.readWithLink("order", query, (result, err) => {
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
            for (var j in oneOrder.productArray) {
                var oneProduct = oneOrder.productArray[j];
                obj.name = oneProduct.name;
                obj.quantity = oneOrder.products[j].quantity;
                obj.price = oneProduct.price;
                obj.status = oneOrder.products[j].status;
                obj.productId = oneOrder.products[j]._id;
                obj.totalPrice = oneProduct.priceInt * obj.quantity;
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