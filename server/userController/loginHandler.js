var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var accountModel = require("../schema/account-schema");

function checkLogin(request, response, next) {
    var getAccount = new Promise(function (resolve, reject) {
        var result = request.body;
        if (result instanceof Error) {
            reject(result);
        }
        if (typeof (result) != "object" || result == null) {
            reject(new Error("Wrong Data Input"));
        }
        resolve(result);
    });

    getAccount.then((result) => {
        var queryObj = {
            user: result.user,
            password: result.password
        };
        return new Promise((resolve, reject) => {
            crud.readOneDocument(accountModel, queryObj, account => {
                if (account == null) {
                    reject(new Error("Authentication Error"));
                }
                resolve(account);
            });
        });
    }).then(account => {
        utilities.createToken((newToken) => {
            newToken += Buffer.from(account.user).toString('base64');
            var currentId = account._id;
            crud.updateOneDocument(accountModel, {_id: currentId}, {token: newToken}, () => {
                response.end(JSON.stringify(newToken)); 
                console.log("Current token: " + newToken);
            });
        });
    }).catch(error => {
        next(error);
    });
}

function checkToken(request, response, next) {
    var getAccount = new Promise(function (resolve, reject) {
        var result = request.body;
        if (result instanceof Error) {
            reject(result);
        }
        if (typeof (result) != "object" || result == null || !result.token) {
            reject(new Error("Wrong Data Input"));
        }
        resolve(result);
    });

    getAccount.then((result) => {
        return new Promise((resolve, reject) => {
            crud.readOneDocument(accountModel, result, account => {
                if (account == null) {
                    reject(new Error("Authentication Error"));
                }
                resolve(account);
            });
        });
    }).then(account => {
        response.end(JSON.stringify(account.user));
    }).catch(error => {
        next(error);
    });
}

module.exports = {
    checkLogin: checkLogin,
    checkToken: checkToken
};