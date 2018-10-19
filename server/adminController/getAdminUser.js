var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var errorHandler = require("../errorHandler/controllerError");

function getAdminUser(request, response) {
    var collectClient = new Promise((resolve, reject) => { 
        utilities.collectDataFromPost(request, result => {
            if (result instanceof Error) {
                reject(result);
            }
            resolve(result);
        });
    });
    var collectUserList = new Promise(function(resolve, reject) {
        crud.readDatabase("account", function(object,error) {
            if (error) {
                reject(error);
            } 
            else {
                resolve(object);
            }
        });
    });
    Promise.all([collectClient, collectUserList]).then(result => {
        var token = result[0].token;
        var users = result[1];
        if (token != "token")
            throw new Error("Authentication Error");
        response.end(JSON.stringify(users));
    }).catch(error => {
        errorHandler(error,response);
        return;
    });
}

module.exports = {
    getAdminUser: getAdminUser
};