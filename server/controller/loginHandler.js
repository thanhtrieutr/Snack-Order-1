var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var errorHandler = require("../errorHandler/controllerError");

function checkLogin(request, response, accountArray) {
    try{
        utilities.collectDataFromPost(request, result => {
            try{
                utilities.setResponseHeader(response);
                var position = utilities.findValidUserPosition(accountArray, result);
                if (position == -1) {
                    throw new Error("Authentication Error");
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
            catch (error) {
                errorHandler(error,response);
                return;
            }
        });
    }
    catch (error) {
        errorHandler(error,response);
        return;
    }
}
function checkLoginHandler(request, response) {
    
    try {
        // don't read 1 time at beginning because accounts can change
        crud.readDatabase("account", function(accountArray) { 
            checkLogin(request, response, accountArray);
        });
    }
    catch (error) {
        errorHandler(error,response);
        return;
    }
}
function checkToken(request, response, accountArray) {
    try {
        debugger;
        utilities.collectDataFromPost(request, result => {
            try {
                //position == -1 mean don't exist that account
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
                    throw new Error("Authentication Error");
                }
            }
            catch (error) {
                errorHandler(error,response);
                return;
            }
        });
    }
    catch (error) {
        errorHandler(error,response);
        return;
    }
}
function checkTokenHandler(request, response) {
    // don't read 1 time at beginning because accounts can change
    try {
        crud.readDatabase("account", function(accountArray) { 
            checkToken(request, response, accountArray);
        });
    }
    catch (error) {
        errorHandler(error,response);
        return;
    }
}

module.exports = {
    checkLogin: checkLoginHandler,
    checkToken: checkTokenHandler
}