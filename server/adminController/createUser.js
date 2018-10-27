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
    var readData = new Promise((resolve, reject) => {
        crud.readDatabase("account", accounts => {
            resolve(accounts);
        });
    });
    Promise.all([readPost, readData]).then(result => {
        var newAccount = result[0],
            accounts = result[1];
        
        newAccount = initUserInfo(newAccount);

        var checkConflict = false;
        for (var i in accounts) {
            if (accounts[i].user == newAccount.user) {
                checkConflict = true;
                break;
            }
        }
        if (checkConflict) {
            throw new Error("Account Existed");
        } else {
            crud.createDocument("account", newAccount);
            response.end("create succeed");
        }
    }).catch(error => {
        errorHandler(error, response);
        return;
    });
}

module.exports = {
    createUser: createUser
};