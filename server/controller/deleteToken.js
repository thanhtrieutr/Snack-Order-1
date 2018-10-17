var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var errorHandler = require("../errorHandler/controllerError");

function deleteToken(request, response) {
    try{
    crud.readDatabase("account", (accountArray) => {
        utilities.collectDataFromPost(request, (token) => {
            try{
                var position = utilities.findAccountByToken(accountArray, token);
                if (position == -1) {
                    throw new Error("Account Doesn't Exist");
                }
                else {
                    utilities.createToken((newToken) => {
                        newToken += Buffer.from(accountArray[position].user).toString('base64');
                        var currentId = accountArray[position]._id;
                        crud.updateOneDocument("account", {_id: currentId}, {token: newToken}, () => {
                            response.end("Success!"); 
                        });
                    });
                }
            }
            catch(error) {
                errorHandler(error,response);
                return;
            }
        });
    });
    }
    catch(error) {
        errorHandler(error,response);
        return;
    }
}

module.exports = {
    deleteToken: deleteToken
};