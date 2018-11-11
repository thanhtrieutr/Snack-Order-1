var utilAdmin = require("../adminController/adminUtilities");
var crud = require("../utilities/databaseCRUD");
var accountModel = require("../schema/account-schema");

function initUserInfo(newAccount) {
    newAccount.fullName = "";
    newAccount.phoneNumber = "";
    newAccount.birthday = "";
    newAccount.address = "";
    newAccount.avatarAddress = "../images/default-avatar.png";
    newAccount.token = "";

    return newAccount;
}

function createUser(request, response, next) {
    var readPost = new Promise((resolve, reject) => {
        var newAccount = request.body;
        if (typeof (newAccount) != "object" || newAccount == null) {
            reject(new Error("Wrong Data Input"));
        }
        if (utilAdmin.validateAccount(newAccount) == false || Object.keys(newAccount).length > 3) {
            reject(new Error("Wrong Data Input"));
        }
        resolve(newAccount);
    });
    readPost.then((result) => {
        return new Promise((resolve, reject) => {
            crud.readOneDocument(accountModel, result, account => {
                if (account != null) {
                    reject( new Error ("Account Existed"));
                }
                resolve(result);
            });
        });
    }).then(newUser => {
        newUser = initUserInfo(newUser);
        crud.createDocument(accountModel, newUser);
        response.end("create succeed");
        
    }).catch(error => {
        next(error);
    });
}

module.exports = {
    createUser: createUser
};