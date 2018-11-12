var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var errorHandler = require("../errorHandler/controllerError");
var accountModel = require("../schema/account-schema")

function deleteToken(request, response) {
    var getAccount = new Promise(function(resolve, reject) {
        var result = request.body;
        if (result instanceof Error) {
            reject(result);
        }
        if (typeof(result) != "object" || result == null || !result.token) {
            reject(new Error ("Wrong Data Input"));
        }
        resolve(result);
    });

    getAccount.then((result) => {
        return new Promise((resolve, reject) => {
            crud.readOneDocument(accountModel, result, account => {
                if (account == null) {
                    reject( new Error("Account Doesn't Exist"));
                }
                resolve(account);
            });
        });
    }).then(admin => {
        utilities.createToken((newToken) => {
            newToken += Buffer.from(admin.user).toString('base64');
            var currentId = admin._id;
            crud.updateOneDocument(accountModel, {_id: currentId}, {token: newToken}, () => {
                response.end("Success!");
            });
        });
    }).catch (error => {
        errorHandler(error, response);
        return;
    });
}

module.exports = {
    deleteToken: deleteToken
};