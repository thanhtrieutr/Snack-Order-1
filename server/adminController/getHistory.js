var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var errorHandler = require("../errorHandler/controllerError");
var adminModel = require("../schema/admin-account-schema");
var orderModel = require("../schema/order-schema");

function createQuery() {
    //find order (link with account, product) 
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
            $project : {
                userName: "$userObj.user",
                time: 1,
                productArray: 1,
                products: 1,
                actualTotalPrice: 1
            }
        }
    ];
    return query;
}

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
            var obj = {}, currentOrder = order[i];
            obj._id = currentOrder._id;
            var tempTime = currentOrder.time;
            obj.time = tempTime.getDate() + "/" + (tempTime.getMonth()+1) + "/" + tempTime.getFullYear();
            obj.products = currentOrder.products;
            obj.user = currentOrder.userName;
            obj.actualTotalPrice = currentOrder.actualTotalPrice;
            for (var j in obj.products) {
                var k = utilities.findObjectById(currentOrder.productArray, obj.products[j]._id);
                obj.products[j].name = currentOrder.productArray[k].name;
                obj.products[j].price = currentOrder.productArray[k].price;
                obj.products[j].totalPrice = obj.products[j].price * obj.products[j].quantity;
            }
            var newObj = utilities.cloneObject(obj);
            orderList.push(newObj);
        }
        response.end(JSON.stringify(orderList));
    }).catch(error => {
        errorHandler(error,response);
        return;
    });
}
module.exports = {
    getHistory: getHistory
}