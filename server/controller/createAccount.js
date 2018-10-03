var utilities = require("../utilities/utilities");
var crud = require("../utilities/databaseCRUD");

function emailCheck(user) {
    if (user.length < 6 || user.length > 100) {
        return false;
    }
    return /^[a-zA-Z0-9_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(user)
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
function createUser(request, response) {
    utilities.collectDataFromPost(request, newAccount => {
        crud.readDatabase("account", accounts => {
            if (validateAccount(newAccount) == false || Object.keys(newAccount).length != 2) {
                response.end("not valid account");
                return;
            }
            var checkConflict = false;
            for (var i in accounts) {
                if (accounts[i].user == newAccount.user) {
                    checkConflict = true;
                    break;
                }
            }
            if (checkConflict) {
                response.end("conflict account");
                return;
            }
            else {
                crud.createDocument("account", newAccount, () => {
                    response.end("create succeed");     
                });
            }
        });
    });
}

module.exports = {
    createUser: createUser
};