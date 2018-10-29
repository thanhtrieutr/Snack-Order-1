var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var errorHandler = require("../errorHandler/controllerError");

function checkAdminLogin(request, response) {
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
            crud.readOneDocument("adminAccount", result, account => {
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
            crud.updateOneDocument("adminAccount", {_id: currentId}, {token: newToken}, () => {
                response.end(JSON.stringify(newToken)); 
                console.log("Current token: " + newToken);
            });
        });
    }).catch (error => {
        errorHandler(error, response);
        return;
    });
}

function checkAdminToken(request, response) {
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
            crud.readOneDocument("adminAccount", result, account => {
                if (account == null) {
                    reject( new Error("Authentication Error"));
                }
                resolve(account);
            });
        });
    }).then(admin => {
        response.end(JSON.stringify(admin.user));
    }).catch (error => {
        errorHandler(error, response);
        return;
    });
}
function deleteToken(request, response) {
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
            crud.readOneDocument("adminAccount", result, account => {
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
            crud.updateOneDocument("adminAccount", {_id: currentId}, {token: newToken}, () => {
                response.end("Success!");
            });
        });
    }).catch (error => {
        errorHandler(error, response);
        return;
    });
}

module.exports = {
    checkLogin: checkAdminLogin,
    checkToken: checkAdminToken,
    deleteToken: deleteToken
}