var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var adminModel = require("../schema/admin-account-schema");

function checkAdminLogin(request, response, next) {
    var getAccount = new Promise(function(resolve, reject) {
        var result = request.body;
        if (result instanceof Error) {
            reject(result);
        }
        if (typeof(result) != "object" || result == null || !result.user || !result.password) {
            reject(new Error ("Wrong Data Input"));
        }
        resolve(result);
    });

    getAccount.then((result) => {
        return new Promise((resolve, reject) => {
            crud.readOneDocument(adminModel, result, account => {
                if (account == null) {
                    reject( new Error("Authentication Error"));
                }
                resolve(account);
            });
        });
    }).then(admin => {
        utilities.createToken((newToken) => {
            newToken += Buffer.from(admin.user).toString('base64');
            var currentId = admin._id;
            crud.updateOneDocument(adminModel, {_id: currentId}, {token: newToken}, () => {
                response.end(JSON.stringify(newToken)); 
                console.log("Current token: " + newToken);
            });
        });
    }).catch (error => {
        next(error);
    });
}

function checkAdminToken(request, response, next) {
    var getAccount = new Promise(function(resolve, reject) {
        var result = request.body;
        if (result instanceof Error) {
            reject(result);
        }
        if (typeof(result) != "object" || result == null || !result.token) {
            reject(new Error ("Wrong Data Input"));
        }
        resolve(result);
    });

    getAccount.then((result) => {
        return new Promise((resolve, reject) => {
            crud.readOneDocument(adminModel, result, account => {
                if (account == null) {
                    reject( new Error("Authentication Error"));
                }
                resolve(account);
            });
        });
    }).then(admin => {
        response.end(JSON.stringify(admin.user));
    }).catch ((error) => {
        next(error);
    });
}
function deleteToken(request, response, next) {
    var getAccount = new Promise(function(resolve, reject) {
        var result = request.body;
        if (result instanceof Error) {
            reject(result);
        }
        if (typeof(result) != "object" || result == null || !result.token) {
            reject(new Error ("Wrong Data Input"));
        }
        resolve(result);
    });

    getAccount.then((result) => {
        return new Promise((resolve, reject) => {
            crud.readOneDocument(adminModel, result, account => {
                if (account == null) {
                    reject( new Error("Account Doesn't Exist"));
                }
                resolve(account);
            });
        });
    }).then(admin => {
        utilities.createToken((newToken) => {
            newToken += Buffer.from(admin.user).toString('base64');
            var currentId = admin._id;
            crud.updateOneDocument(adminModel, {_id: currentId}, {token: newToken}, () => {
                response.end("Success!");
            });
        });
    }).catch (error => {
        next(error);
    });
}

module.exports = {
    checkLogin: checkAdminLogin,
    checkToken: checkAdminToken,
    deleteToken: deleteToken
};