var utilities = require("../utilities/utilities");
var crud = require("../utilities/databaseCRUD");
var errorHandler = require("../errorHandler/controllerError");

function deleteAccount(request, response, accountArray) {
    try {
        utilities.collectDataFromPost(request, result => {
            try {
                var position = utilities.findValidUserPosition(accountArray, result);
                if (position == -1) {
                    throw new Error("Account Doesn't Exist");
                }
                else {
                    crud.deleteOneDocument("account" ,accountArray[position]);
                    response.end("Delete successfully");
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
function deleteOneUser(request, response) {
    var accountArray;
    try{
        crud.readDatabase("account", function(item) { 
            accountArray  = item;
            deleteAccount(request, response, accountArray);
        });
    }
    catch (error) {
        errorHandler(error,response);
        return;
    }
}
module.exports = {
    deleteOneUser: deleteOneUser
}