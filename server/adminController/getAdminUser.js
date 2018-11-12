var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var accountModel = require("../schema/account-schema");
var adminModel = require("../schema/admin-account-schema");

function getAdminUser(request, response, next) {
    var collectClient = new Promise((resolve, reject) => {
        var result = request.body;
        if (result instanceof Error) {
            reject(result);
        }
        if (typeof (result) != "object" || result == null) {
            reject(new Error("Wrong Data Input"));
        }
        resolve(result);
    });
    var collectUserList = new Promise(function(resolve, reject) {
        crud.readDatabase(accountModel, function(object,error) {
            if (error) {
                reject(error);
            } else {
                resolve(object);
            }
        });
    });
    Promise.all([collectClient, collectUserList]).then(result => {
        return new Promise((resolve, reject) => {
            var obj = {token : result[0].token};
            crud.readOneDocument(adminModel, obj, account => {
                if (account == null) {
                    reject(new Error("Authentication Error"));
                }
                resolve(result);
            });
        });
    }).then(result => {
        var users = result[1];
        response.end(JSON.stringify(users));
    }).catch(error => {
        next(error);
    });
}

module.exports = {
    getAdminUser: getAdminUser
};