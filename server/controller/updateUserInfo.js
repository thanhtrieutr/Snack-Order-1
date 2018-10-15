var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var listInfo = ["fullName", "phoneNumber", "birthday", "address"];
function checkUserInfo(result) {
    for (var i in listInfo) {
        if (result[listInfo[i]] == null)
            return false;
    }
    return true;
}
module.exports = function updateUserInfo(request, response) {
  var currentID, position = -1;
    utilities.collectDataFromPost(request, result => {
        if (!result.token || Object.keys(result).length != 5 || checkUserInfo(result) == false) {
            utilities.setResponseHeader(response);
            response.end("Update Fail");
            return;
        }
        crud.readDatabase("account", function(object) {
            for (var i = 0 ; i < object.length ; i++) {
                let token = object[i].token;
                if (result.token === token) {
                    position = i;
                    currentID = object[i];
                    break;
                }
            }
            if (position > -1) {
                delete result.token;
                crud.updateOneDocument("account", {_id:currentID._id}, result, function() {
                    utilities.setResponseHeader(response);
                    response.end("Update Successful");
                });
            }
            else {
                response.end("Fail!");
            }
        })
    })
}