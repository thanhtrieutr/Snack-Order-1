var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var errorHandler = require("../errorHandler/controllerError");

function passwordCheck(password) {
    return /^[[a-zA-Z0-9!#$%&'*+-/=?^_`{|}]+$/.test(password);
}

module.exports = function updatePassword(request, response) {
    var currentId;
    try {
        utilities.collectDataFromPost(request, result => {
            try {
                var checkOldPassword = false;
                if (!result.oldPassword || !result.token || !result.newPassword || Object.keys(result).length != 3) {
                    throw new Error('Wrong Data Input');
                }
                crud.readDatabase("account", function(object) {
                    for (var i = 0 ; i < object.length ; i++) {
                        let token = object[i].token;
                        if (result.oldPassword === object[i].password && result.token === token) {
                            checkOldPassword = true;
                            currentId = object[i];
                            break;
                        }
                    }
                    if (result.newPassword.length < 8 || result.newPassword.length > 16 || !passwordCheck(result.newPassword) || checkOldPassword === false) {
                        throw new Error('Authentication Error');
                    }
                    crud.updateOneDocument("account", {_id:currentId._id}, {password:result.newPassword}, function() {
                        utilities.setResponseHeader(response);
                        response.end("Update Success");
                    });
                });
            }
            catch (error) {
                debugger;
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