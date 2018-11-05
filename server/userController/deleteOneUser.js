var utilities = require("../utilities/utilities");
var crud = require("../utilities/databaseCRUD");
var errorHandler = require("../errorHandler/controllerError");

function deleteOneUser(request, response) {
    var collectClient = new Promise((resolve, reject) => {
        var result = request.body;
        if (result == null || typeof(result) != "object" || !result.token) {
            reject(new Error ("Wrong Data Input"));
        }
        resolve(result);
    })

    collectClient.then(result => {
        return new Promise((resolve, reject) => {
            var obj = result;
            crud.readOneDocument("account", obj, account => {
                if (account == null) {
                    reject(new Error("Account Doesn't Exist"));
                }
                resolve(account);
            });
        });
    }).then(result => {
        crud.deleteOneDocument("account" ,result);
        response.end("Delete successfully");
    }).catch(error => {
        errorHandler(error,response);
        return;
    });
}
module.exports = {
    deleteOneUser: deleteOneUser
}