var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var errorHandler = require("../errorHandler/controllerError");
var listInfo = ["fullName", "phoneNumber", "birthday", "address"];

function checkToken(request, response, accountArray) {
    try {
        utilities.collectDataFromPost(request, result => {
            //position == -1 mean don't exist that account
            try {
                var position = utilities.findAccountByToken(accountArray, result.token);
                if (position != -1) {
                    var obj = {};
                    obj.avatarAddress = accountArray[position].avatarAddress;
                    for (var i in listInfo) {
                        obj[listInfo[i]] = accountArray[position][listInfo[i]];
                    }
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