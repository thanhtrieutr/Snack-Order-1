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
                    var token = Buffer.from(accountArray[position].user).toString('base64');
                    console.log(token);
                    response.end(JSON.stringify(token));
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
        utilities.collectDataFromPost(request, result => {
            try {
                //position == -1 mean don't exist that account
                var position = -1;
                for (var i in accountArray) {
                    let token = Buffer.from(accountArray[i].user).toString('base64');
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