var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var errorHandler = require("../errorHandler/controllerError");
var productList = [
    {name: "Snack something", amount: 2, price: "19.000đ", totalPrice: "38.000đ", user: "HuuDuc", state: "In progress"},
    {name: "Snack something", amount: 2, price: "19.000đ", totalPrice: "38.000đ", user: "HuuDuc", state: "In progress"},
    {name: "Snack something", amount: 2, price: "19.000đ", totalPrice: "38.000đ", user: "HuuDuc", state: "In progress"},
    {name: "Snack something", amount: 2, price: "19.000đ", totalPrice: "38.000đ", user: "HuuDuc", state: "In progress"},
    {name: "Snack something", amount: 2, price: "19.000đ", totalPrice: "38.000đ", user: "HuuDuc", state: "In progress"}
];

function getTodayOrder(request, response) {
    //in future will receive token of admin
    var collectClient = new Promise((resolve, reject) => { 
        try {
            utilities.collectDataFromPost(request, result => {
                resolve(result);
            });
        }
        catch (error) {
            reject(error);
            return;
        }
    });
    var collectProductList = new Promise((resolve, reject) => {
        //don't have data => use fake data
        try {
            resolve(productList);
        }
        catch (error) {
            reject(error);
            return;
        }
    });
    Promise.all([collectClient, collectProductList]).then(result => {
        var token = result[0].token;
        var products = result[1];
        if (token != "token")
            throw new Error("Authentication Error");
        response.end(JSON.stringify(products));
    }).catch(error => {
        errorHandler(error,response);
        return;
    });
}

module.exports = {
    getTodayOrder: getTodayOrder
};