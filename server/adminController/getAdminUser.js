var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var errorHandler = require("../errorHandler/controllerError");

function getAdminUser(request, response) {
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
        return new Promise((resolve, reject) => {
            var obj = {token : result[0].token};
            crud.readOneDocument("adminAccount", obj, account => {
                if (account == null) {
                    reject( new Error("Authentication Error"));
                }
                resolve(result);
            });
        });
    }).then(result => {
        var users = result[1];
        response.end(JSON.stringify(users));
    }).catch(error => {
        errorHandler(error,response);
        return;
    });
}

module.exports = {
    getAdminUser: getAdminUser
};