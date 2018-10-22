var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var errorHandler = require("../errorHandler/controllerError");

function checkLogin(request, response, accountArray) {
    var getAccount = new Promise(function(resolve, reject) {
        utilities.collectDataFromPost(request, result => {
            if (result instanceof Error) {
                reject(result);
            }
            var position = utilities.findValidUserPosition(accountArray, result);
            if (position == -1) {
                reject (new Error("Email or Password is incorrect"));
            }
            resolve(accountArray[position]);
        });
    });

    getAccount.then(admin => {
        utilities.createToken((newToken) => {
            newToken += Buffer.from(admin.user).toString('base64');
            var currentId = admin._id;
            crud.updateOneDocument("adminAccount", {_id: currentId}, {token: newToken}, () => {
                response.end(JSON.stringify(newToken)); 
                console.log("Current token: " + newToken);
            });
        });
    }).catch(error => {
        errorHandler(error, response);
        return;
    });
}

function checkAdminLogin(request, response) {
    var promise = new Promise(function(resolve, reject) {
        // don't read 1 time at beginning because accounts can change
        crud.readDatabase("adminAccount", function(accountArray, error) {
            if (error) {
                reject(error);
            } 
            else {
                checkLogin(request, response, accountArray);
            }
        });
    });
    promise.catch (error => {
        errorHandler(error, response);
        return;
    })
}

function checkToken(request, response, accountArray) {
    var getToken = new Promise(function(resolve, reject) {
        utilities.collectDataFromPost(request, result => {
            if (result instanceof Error) {
                reject(new Error ('Wrong Data Input'));
            }
            var position = utilities.findAccountByToken(accountArray, result);
            if (position != -1) {
                utilities.setResponseHeader(response);
                response.end(JSON.stringify(accountArray[position].user));
            }
            else {
                reject (new Error("Authentication Error"));
            }  
        });
    });
    getToken.catch (error => {
        errorHandler(error,response);
        return;
    })
}
function checkAdminToken(request, response) {
    // don't read 1 time at beginning because accounts can change
    var promise = new Promise(function(resolve, reject) {
        crud.readDatabase("adminAccount", function(accountArray, error) { 
            if (error) {
                reject(error);
            } 
            else {
                checkToken(request, response, accountArray);
            }
        })
    })
    promise.catch (error => {
        errorHandler(error,response);
        return;
    })
}
function deleteToken(request, response) {
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
    var collectAdminAccount = new Promise((resolve, reject) => {
        try {
            crud.readDatabase("adminAccount", (accountArray) => {
                resolve(accountArray);
            });
        }
        catch (error) {
            reject(error);
            return;
        }
    });

    Promise.all([collectClient, collectAdminAccount]).then(result => {
        var token = result[0], accountArray = result[1];
        var position = utilities.findAccountByToken(accountArray, token);
        if (position == -1) {
            throw new Error("Account Doesn't Exist");
        }
        utilities.createToken((newToken) => {
            newToken += Buffer.from(accountArray[position].user).toString('base64');
            var currentId = accountArray[position]._id;
            crud.updateOneDocument("adminAccount", {_id: currentId}, {token: newToken}, () => {
                response.end("Success!"); 
            });
        });
    }).catch(error => {
        errorHandler(error,response);
        return;
    });
}

module.exports = {
    checkLogin: checkAdminLogin,
    checkToken: checkAdminToken,
    deleteToken: deleteToken
}