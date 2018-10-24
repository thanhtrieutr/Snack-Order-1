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

function getHistory(request, response, product, adminAccountArray) {
    var collectClient = new Promise((resolve, reject) => {
        try {
            utilities.collectDataFromPost(request, result => {
                resolve(result);
            });
        } catch(error) {
            reject(error);
            return;
        }
    });
    var collectOrderHistory = new Promise((resolve, reject) => {
        try {
            resolve(orderList);
        } catch(error) {
            reject(error);
            return;
        }
    });
    Promise.all([collectClient, collectOrderHistory]).then(result => {
        var currentToken = result[0].token;
        var allOrder = result[1];
        var currentPosition = -1;
        //currentPosition = utilities.findAccountByToken(adminAccountArray, currentToken);
        if (currentPosition == -2) {
            reject(new Error("Authentication Error"));
        } 
        else {
            // crud.readDatabase("order",function() {
                
            // });
            response.end(JSON.stringify(allOrder));
        }
    }).catch(error => {
        errorHandler(error, response);
        return;
    });
}
module.exports = {
    getHistory: getHistory
}