var utilities = require("../utilities/utilities");
var crud = require("../utilities/databaseCRUD");
var errorHandler = require("../errorHandler/controllerError");

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
    try{
        utilities.collectDataFromPost(request, newAccount => {
            try {
                if (typeof(newAccount) != "object" || newAccount == null) {
                    throw new Error ("Wrong Data Input");
                }
                crud.readDatabase("account", accounts => {
                    if (validateAccount(newAccount) == false || Object.keys(newAccount).length > 3) {
                        throw new Error ("Wrong Data Input");
                    }
                    var checkConflict = false;
                    for (var i in accounts) {
                        if (accounts[i].user == newAccount.user) {
                            checkConflict = true;
                            break;
                        }
                    }
                    if (checkConflict) {
                        throw new Error ("Account Existed");
                    }
                    else {
                        crud.createDocument("account", newAccount, () => {
                            response.end("create succeed");     
                        });
                    }
                });
            }
            catch (error) {
                errorHandler(error,response);
                return;
            }
        });
    }
    catch (error) {
        errorHandler(error,response);
        return;
    }
}

module.exports = {
    createUser: createUser
};