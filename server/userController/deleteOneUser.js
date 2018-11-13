var crud = require("../utilities/databaseCRUD");
var accountModel = require("../schema/account-schema");

function deleteOneUser(request, response, next) {
    var collectClient = new Promise((resolve, reject) => {
        var result = request.body;
        if (result == null || typeof (result) != "object" || !result.token) {
            reject(new Error("Wrong Data Input"));
        }
        resolve(result);
    });

    collectClient.then(result => {
        return new Promise((resolve, reject) => {
            var obj = result;
            crud.readOneDocument(accountModel, obj, account => {
                if (account == null) {
                    reject(new Error("Account Doesn't Exist"));
                }
                resolve(account);
            });
        });
    }).then(result => {
        crud.deleteOneDocument(accountModel, result);
        response.end("Delete successfully");
    }).catch(error => {
        next(error);
    });
}
module.exports = {
    deleteOneUser: deleteOneUser
};