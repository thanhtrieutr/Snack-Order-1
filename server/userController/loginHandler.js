var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var errorHandler = require("../errorHandler/controllerError");

function checkLogin(request, response) {
    var getAccount = new Promise(function(resolve, reject) {
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

    getAccount.then((result) => {
        var queryObj = {user: result.user, password: result.password};
        return new Promise((resolve, reject) => {
            crud.readOneDocument("account", queryObj, account => {
                if (account == null) {
                    reject( new Error("Authentication Error"));
                }
                resolve(account);
            });
        });
    }).then(account => {
        utilities.createToken((newToken) => {
            newToken += Buffer.from(account.user).toString('base64');
            var currentId = account._id;
            crud.updateOneDocument("account", {_id: currentId}, {token: newToken}, () => {
                response.end(JSON.stringify(newToken)); 
                console.log("Current token: " + newToken);
            });
        });
    }).catch (error => {
        errorHandler(error, response);
        return;
    });
}

function checkToken(request, response) {
    var getAccount = new Promise(function(resolve, reject) {
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

    getAccount.then((result) => {
        return new Promise((resolve, reject) => {
            crud.readOneDocument("account", result, account => {
                if (account == null) {
                    reject( new Error("Authentication Error"));
                }
                resolve(account);
            });
        });
    }).then(account => {
        response.end(JSON.stringify(account.user));
    }).catch (error => {
        errorHandler(error, response);
        return;
    });
}

module.exports = {
    checkLogin: checkLogin,
    checkToken: checkToken
}