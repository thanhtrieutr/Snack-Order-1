var fs = require('fs');
var path = require('path');
var crud = require('../utilities/databaseCRUD');
var crypto = require("crypto");
var productModel = require("../schema/product-schema");
var adminModel = require("../schema/admin-account-schema");

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

//middleware to check admin token in header
function authenticationAdminByHeader(request, response, next) {
    var obj = {token : request.get('token')};
    crud.readOneDocument(adminModel, obj, account => {
        if (account == null) {
            next(new Error("Authentication Error"));
            return;
        }
        request.account = account;
        next();
    });
}
module.exports = {
    validateAccount: validateAccount,
    authenticationAdminByHeader: authenticationAdminByHeader,
    emailCheck: emailCheck,
    passwordCheck: passwordCheck
};
