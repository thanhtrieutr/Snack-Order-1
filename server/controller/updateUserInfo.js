var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");

module.exports = function updateUserInfo(request, response) {
  var currentID;
    utilities.collectDataFromPost(request, result => {
        if (!result.token) {
            utilities.setResponseHeader(response);
            response.end("Update Fail");
            return;
        }
        crud.readDatabase("account", function(object) {
            for (var i = 0 ; i < object.length ; i++) {
                let token = Buffer.from(object[i].user).toString('base64');
                if (result.token === token) {
                    currentID = object[i];
                    break;
                }
            }
            crud.updateOneDocument("account", {_id:currentID._id}, {fullName:result.fullName}, {phoneNumber:result.phoneNumber}, {birthday:result.birthday}, {address:result.address}, function() {
                utilities.setResponseHeader(response);
                response.end("Update Successful");
            });
        })
    })
}