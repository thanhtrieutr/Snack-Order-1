var http = require("http");
var fs = require('fs');
var path = require('path');
var crud = require('../utilities/databaseCRUD');
var crypto = require("crypto");
var productModel = require("../schema/product-schema");

// function savePhoto(object, filename, data, callback) {
//     if (typeof(filename) != 'string' || typeof(data) != 'string') {
//         callback("not valid data");
//         return;
//     }
//     var filePath = '/static/images/' + filename;
//     console.log(filePath);
//     var data = data.replace(/^data:image\/\w+;base64,/, "");
//     var buf = new Buffer(data, 'base64');
//     fs.writeFile(path.join(__dirname,'../../images/' + filename), buf, function(err) {
//         if (err) {
//             return callback(err);
//         }
//         checkWriteFile = true;
//         var avatarValue = {
//             img: filePath
//         };
//         crud.updateOneDocument("product", object, avatarValue, function(err) {
//             if (err) callback(err);
//         });
//         return callback(err);
//     });
// }

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

//middleware to check admin token in header
function authenticationAdminByHeader(request, response, next) {
    var obj = {token : request.get('token')};
    crud.readOneDocument("adminAccount", obj, account => {
        if (account == null) {
            errorHandler(new Error("Authentication Error"),response);
            return;
        }
        request.account = account;
        next();
    });
}
module.exports = {
    //savePhoto: savePhoto,
    validateAccount: validateAccount,
    authenticationAdminByHeader: authenticationAdminByHeader
}