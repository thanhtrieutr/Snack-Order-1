var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var errorHandler = require("../errorHandler/controllerError");

var orderList = [
    {
        user: "test567@gmail.com",
        actualTotalPrice: 150000,
        time: "22/10/2018",
        products: [
            {
               name: "snack1",
               quantity: 2,
               price: "12345đ",
               totalPrice: 38000,
               status: "Done"
            },
            {
                name: "snack1",
                quantity: 2,
                price: "12345đ",
                totalPrice: 38000,
                status: "pending"
            }
        ]
    },
    {
        user: "absda@gmail.com",
        actualTotalPrice: 150000,
        time: "23/10/2018",
        products: [
            {
               name: "snack2",
               quantity: 2,
               price: "12345đ",
               totalPrice: 38000,
               status: "Done"
            },
            {
                name: "snack2",
                quantity: 2,
                price: "12345đ",
                totalPrice: 38000,
                status: "pending"
            }
        ]
    },
    {
        user: "fjaoiu@gmail.com",
        actualTotalPrice: 150000,
        time: "24/10/2018",
        products: [
            {
               name: "snack3",
               quantity: 2,
               price: "12345đ",
               totalPrice: 38000,
               status: "Done"
            },
            {
                name: "snack3",
                quantity: 2,
                price: "12345đ",
                totalPrice: 38000,
                status: "pending"
            }
        ]
    }
];


function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attribute in obj) {
        if (obj.hasOwnProperty(attribute)) {
            copy[attribute] = obj[attribute];
        }
    }
    return copy;
}

function getHistory(request, response) {
    var collectAdmin = new Promise((resolve, reject) => {
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
                })
            });
        } catch(error) {
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
    var collectOrderHistory = new Promise((resolve, reject) => {
        try {
            crud.readDatabase("order", function(item){
                var orderList = item;
                resolve(orderList);
            });
        } catch(error) {
            reject(error);
            return;
        }
    });
    Promise.all([collectAdmin, collectAccount, collectProduct, collectOrderHistory]).then(result => {
        var currentAdminToken = result[0].token;
        var accountArray = result[1];
        var productArray = result[2];
        var orderHistoryArray = result[3];
        var allOrder = [];
        if (currentAdminToken != "token") {
            throw new Error("Authentication Error");
        }
        else {
            for (var i in orderHistoryArray) {
                var obj = {};
                var currentOrder = orderHistoryArray[i];
                obj._id = currentOrder._id;
                obj.user = currentOrder.user;
                obj.time = currentOrder.time;
                obj.date = obj.time.getDate();
                obj.month = obj.time.getMonth()+1;
                obj.year = obj.time.getFullYear();
                obj.hours = obj.time.getHours();
                obj.time = obj.date + "/" + obj.month + "/" + obj.year;
                obj.products = currentOrder.products;
                obj.actualTotalPrice = currentOrder.actualTotalPrice;
                for (var j in accountArray) {
                    if (currentOrder.user.toString() == accountArray[j]._id.toString()) {
                        var currentUsername = accountArray[j].user;
                        obj.user.name = currentUsername;
                        break;
                    }
                }
                
                for (var j in obj.products) {
                    obj.products[j].quantity = currentOrder.products[j].quantity;
                    for (var k in productArray) {
                        if (obj.products[j]._id.toString() == productArray[k]._id.toString()) {
                            obj.products[j].name = productArray[k].name;
                            obj.products[j].price = productArray[k].priceInt;
                            obj.products[j].totalPrice = obj.products[j].price * obj.products[j].quantity;
                            break;
                        }
                    }
                }
                var newObj = clone(obj);
                allOrder.push(newObj);
            }
        }
        response.end(JSON.stringify(allOrder));
    }).catch(error => {
        errorHandler(error, response);
        return;
    });
}
module.exports = {
    getHistory: getHistory
}