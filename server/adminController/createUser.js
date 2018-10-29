var utilities = require("../utilities/utilities");
var utilAdmin = require("../adminController/adminUtilities");
var crud = require("../utilities/databaseCRUD");
var errorHandler = require("../errorHandler/controllerError");

function initUserInfo(newAccount) {
    newAccount.fullName = "";
    newAccount.phoneNumber = "";
    newAccount.birthday = "";
    newAccount.address = "";
    newAccount.avatarAddress = "";
    newAccount.token = "";

    return newAccount;
}

function createUser(request, response) {
    var readPost = new Promise((resolve, reject) => {
        utilities.collectDataFromPost(request, newAccount => {
            if (typeof (newAccount) != "object" || newAccount == null) {
                reject(new Error("Wrong Data Input"));
            }
            if (utilAdmin.validateAccount(newAccount) == false || Object.keys(newAccount).length > 3) {
                reject(new Error("Wrong Data Input"));
            }
            resolve(newAccount);
        });
    });
    readPost.then((result) => {
        return new Promise((resolve, reject) => {
            crud.readOneDocument("account", result, account => {
                if (account != null) {
                    reject( new Error ("Account Existed"))
                }
                resolve(result);
            })
        })
    }).catch(error => {
        response.end("Account Existed");
        return;

    }).then(newUser => {
        newUser = initUserInfo(newUser);
        crud.createDocument("account", newUser);
        response.end("create succeed");
        
    }).catch(error => {
        errorHandler(error, response);
        return;
    });
}

module.exports = {
    createUser: createUser
};