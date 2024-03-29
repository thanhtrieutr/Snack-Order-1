var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var errorHandler = require("../errorHandler/controllerError");

function passwordCheck(password) {
    return /^[[a-zA-Z0-9!#$%&'*+-/=?^_`{|}]+$/.test(password);
}

module.exports = function updatePassword(request, response) {
    var collectClient = new Promise(function(resolve, reject) {
        var result = request.body;
        if (result instanceof Error) {
            reject(new Error ("Wrong Data Input"));
        }
        if (typeof(result) != "object" || result == null) {
            reject(new Error ("Wrong Data Input"));
        }
        if (!result.oldPassword || !result.token || !result.newPassword || Object.keys(result).length != 3) {
            reject(new Error('Wrong Data Input'));
        }
        if (result.newPassword.length < 8 || result.newPassword.length > 16 || !passwordCheck(result.newPassword)) {
            reject(new Error('Authentication Error'));
        }
        resolve(result);
    });

    collectClient.then(result => {
        return new Promise((resolve, reject) => {
            var queryObj = {password: result.oldPassword, token: result.token};
            crud.readOneDocument("account", queryObj, account => {
                if (account == null) {
                    reject( new Error("Account Doesn't Exist"));
                }
                resolve(result);
            });
        });
    }).then(result => {
        crud.updateOneDocument("account", {token: result.token}, {password: result.newPassword}, function() {
            utilities.setResponseHeader(response);
            response.end("Update Success");
        });
    }).catch (error=> {
        errorHandler(error,response);
        return;
    });
}