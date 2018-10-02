var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");

function passwordCheck(password) {
    return /^[[a-zA-Z0-9!#$%&'*+-/=?^_`{|}]+$/.test(password);
}

module.exports = function updatePassword(request, response) {
    debugger;
    var currentId;
    utilities.collectDataFromPost(request, result => {
        var checkOldPassword = false;
        if (!result.oldPassword || !result.token || !result.newPassword || Object.keys(result).length != 3) {
            utilities.setResponseHeader(response);
            response.end("Fail");
            return;
        }
        crud.readDatabase("account", function(object) {
            for (var i = 0 ; i < object.length ; i++) {
                let token = Buffer.from(object[i].user).toString('base64');
                debugger;
                if (result.oldPassword === object[i].password && result.token === token) {
                    checkOldPassword = true;
                    currentId = object[i];
                    debugger;
                    break;
                }
            }
            if (result.newPassword.length < 8 || result.newPassword.length > 16 || !passwordCheck(result.newPassword) || checkOldPassword === false) {
                utilities.setResponseHeader(response);
                response.end("Fail");
                return;
            }
            crud.updateOneDocument("account", {_id:currentId._id}, {password:result.newPassword}, function() {
                utilities.setResponseHeader(response);
                response.end("Update Success");
            });
        });
    });
}