var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var errorHandler = require("../errorHandler/controllerError");

function checkToken(request, response, accountArray) {
    utilities.collectDataFromPost(request, result => {
        //position == -1 mean don't exist that account
        var position = -1;
        for (var i in accountArray) {
            let token = accountArray[i].token;
            if (token == result.token) {
                position = i;
                break;
    try {
        utilities.collectDataFromPost(request, result => {
            //position == -1 mean don't exist that account
            try {
                var position = -1;
                for (var i in accountArray) {
                    let token = Buffer.from(accountArray[i].user).toString('base64');
                    if (token == result.token) {
                        position = i;
                        break;
                    }
                }
                if (position != -1) {
                    var obj = {};
                    obj.avatarAddress = accountArray[i].avatarAddress;
                    utilities.setResponseHeader(response);
                    response.end(JSON.stringify(obj));
                }
                else {
                    throw new Error ("Authentication Error");
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

module.exports = function (request, response) {
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