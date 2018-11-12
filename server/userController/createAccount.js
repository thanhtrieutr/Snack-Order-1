//move create to admin
var crud = require("../utilities/databaseCRUD");
var accountModel = require("../schema/account-schema");

function emailCheck(user) {
    if (user.length < 6 || user.length > 100) {
        return false;
    }
    return /^[a-zA-Z0-9_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(user);
}

function passwordCheck(password) {
    if (password.length < 8 || password.length > 16) {
        return false;
    }
    return /^[[a-zA-Z0-9!#$%&'*+-/=?^_`{|}]+$/.test(password);
}

function validateAccount(account) {
    if (emailCheck(account.user) && passwordCheck(account.password))
        return true;
    return false;
}

function createUser(request, response, next) {
    var readPost = new Promise((resolve, reject) => {
        var newAccount = request.body;
        if (typeof (newAccount) != "object" || newAccount == null) {
            reject(new Error("Wrong Data Input"));
        }
        if (validateAccount(newAccount) == false || Object.keys(newAccount).length > 3) {
            reject(new Error("Wrong Data Input"));
        }
        resolve(newAccount);
    });
    var readData = new Promise((resolve, reject) => {
        crud.readDatabase(accountModel, accounts => {
            resolve(accounts);
        });
    });
    Promise.all([readPost, readData]).then(result => {
        var newAccount = result[0],
            accounts = result[1];
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
            response.end("create succeed");
        }
    }).catch(error => {
        next(error);
    });
}

module.exports = {
    createUser: createUser
};