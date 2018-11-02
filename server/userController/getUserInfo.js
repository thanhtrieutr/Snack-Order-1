var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var errorHandler = require("../errorHandler/controllerError");
var listInfo = ["fullName", "phoneNumber", "birthday", "address"];

function checkToken(request, response, accountArray) {
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

    collectClient.then((result) => {
        var queryObj = {token: result.token};
        return new Promise((resolve, reject) => {
            crud.readOneDocument("account", queryObj, account => {
                if (account == null) {
                    reject( new Error("Authentication Error"));
                }
                resolve(account);
            });
        });
    }).then(account => {
        var obj = {};
        obj.avatarAddress = account.avatarAddress;
        for (var i in listInfo) {
            obj[listInfo[i]] = account[listInfo[i]];
        }
        response.end(JSON.stringify(obj));
    }).catch (error => {
        errorHandler(error, response);
        return;
    });
}

module.exports = function (request, response) {
    checkToken(request, response);
}