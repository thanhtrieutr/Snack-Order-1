var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var errorHandler = require("../errorHandler/controllerError");

function passwordCheck(password) {
    return /^[[a-zA-Z0-9!#$%&'*+-/=?^_`{|}]+$/.test(password);
}

module.exports = function updatePassword(request, response) {
    var currentId;
    var promise1 = new Promise(function(resolve, reject) {
        utilities.collectDataFromPost(request, result =>{
            if (result instanceof Error) reject(new Error ("Wrong Data Input"));
            resolve(result);
        });
    });

    var promise2 = new Promise(function(resolve, reject) {
        crud.readDatabase("account", function(object,error) {
            if (error) {
                reject(error);
            } 
            else {
                resolve(object);
            }
        });
    });

    Promise.all([promise1,promise2])
    .then(result => {
        var checkOldPassword = false;
        if (!result[0].oldPassword || !result[0].token || !result[0].newPassword || Object.keys(result[0]).length != 3) {
            throw new Error('Wrong Data Input');
        }
        for (var i = 0 ; i < result[1].length ; i++) {
            let token = result[1][i].token;
            if (result[0].oldPassword === result[1][i].password && result[0].token === token) {
                checkOldPassword = true;
                currentId = result[1][i];
                break;
            }
        }
        if (result[0].newPassword.length < 8 || result[0].newPassword.length > 16 || !passwordCheck(result[0].newPassword) || checkOldPassword === false) {
            throw new Error('Authentication Error');
        }
        crud.updateOneDocument("account", {_id:currentId._id}, {password:result[0].newPassword}, function() {
            utilities.setResponseHeader(response);
            response.end("Update Success");
        });
    })
    .catch (error=> {
        errorHandler(error,response);
        return;
    });
}