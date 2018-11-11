var crud = require("../utilities/databaseCRUD");
var listInfo = ["fullName", "phoneNumber", "birthday", "address"];
var accountModel =  require("../schema/account-schema");

function checkToken(request, response, next) {
    var collectClient = new Promise((resolve, reject) => {
        var result = request.body;
        if (result instanceof Error) {
            reject(result);
        }
        if (typeof(result) != "object" || result == null) {
            reject(new Error ("Wrong Data Input"));
        }
        resolve(result);
    });

    collectClient.then((result) => {
        var queryObj = {token: result.token};
        return new Promise((resolve, reject) => {
            crud.readOneDocument(accountModel, queryObj, account => {
                if (account == null) {
                    reject( new Error("Authentication Error"));
                }
                resolve(account);
            });
        });
    }).then(account => {
        var obj = {};
        obj.avatarAddress = account.avatarAddress;
        for (var i in listInfo) {
            obj[listInfo[i]] = account[listInfo[i]];
        }
        response.end(JSON.stringify(obj));
    }).catch (error => {
        next(error);
    });
}

module.exports = function (request, response) {
    checkToken(request, response);
};