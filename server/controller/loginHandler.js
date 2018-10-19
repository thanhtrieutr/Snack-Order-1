var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var errorHandler = require("../errorHandler/controllerError");

function checkLogin(request, response, accountArray) {
    var promise = new Promise(function(resolve, reject) {
        utilities.collectDataFromPost(request, result => {
            if (result instanceof Error) {
                reject(result);
            }
            else {
                utilities.setResponseHeader(response);
                var position = utilities.findValidUserPosition(accountArray, result);
                if (position == -1) {
                    reject (new Error("Email or Password is incorrect"));
                }
                else {
                    utilities.createToken((newToken) => {
                    newToken += Buffer.from(accountArray[position].user).toString('base64');
                    var currentId = accountArray[position]._id;
                        crud.updateOneDocument("account", {_id: currentId}, {token: newToken}, () => {
                            response.end(JSON.stringify(newToken)); 
                            console.log("Current token: " + newToken);
                        });
                    });
                }
            }   
        });
    });

    Promise.all([promise])
    .catch(error => {
        errorHandler(error, response);
        return;
    });
}

function checkLoginHandler(request, response) {
    var promise = new Promise(function(resolve, reject) {
        // don't read 1 time at beginning because accounts can change
        crud.readDatabase("account", function(accountArray, error) {
            if (error) {
                reject(error);
            } 
            else {
                checkLogin(request, response, accountArray);
            }
        });
    });
    Promise.all([promise])
    .catch (error => {
        errorHandler(error, response);
        return;
    })
}

function checkToken(request, response, accountArray) {
    var promise = new Promise(function(resolve, reject) {
        utilities.collectDataFromPost(request, result => {
            if (result instanceof Error) {
                reject(new Error ('Wrong Data Input'));
            }
            else {
                var position = -1;
                for (var i in accountArray) {
                    let token = accountArray[i].token;
                    if (token == result) {
                        position = i;
                        break;
                    }
                }
                if (position != -1) {
                    utilities.setResponseHeader(response);
                    response.end(JSON.stringify(accountArray[position].user));
                }
                else {
                    reject (new Error("Authentication Error"));
                }
            }   
        });
    });
    Promise.all([promise])
    .catch (error => {
        errorHandler(error,response);
        return;
    })
}
function checkTokenHandler(request, response) {
    // don't read 1 time at beginning because accounts can change
    var promise = new Promise(function(resolve, reject) {
        crud.readDatabase("account", function(accountArray, error) { 
            if (error) {
                reject(error);
            } 
            else {
                checkToken(request, response, accountArray);
            }
        })
    })
    Promise.all([promise])
    .catch (error => {
        errorHandler(error,response);
        return;
    })
}

module.exports = {
    checkLogin: checkLoginHandler,
    checkToken: checkTokenHandler
}