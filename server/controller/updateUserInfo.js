var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var listInfo = ["fullName", "phoneNumber", "birthday", "address"];

//check user input
function checkValidPhone(telephone) {
    if (telephone == "" || telephone == null) {
        return true;
    }
    else return /^[0-9\s- \+]{8,13}$/.test(telephone);
}
function checkValidFullName(fullName) {
    if (fullName == "" || fullName == null) {
        return true;
    }
    else return /^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/.test(fullName);
}
function checkValidBirthday(birthday) {
    if (birthday == "" || birthday == null) {
        return true;
    }
    else return /^\s*(3[01]|[12][0-9]|0?[1-9])\/(1[012]|0?[1-9])\/((?:19|20)\d{2})\s*$/.test(birthday);
}
function checkValidAddress(address) {
    if (address == "" || address == null) {
        return true;
    } 
    else return /^\s*\S+(?:\s+\S+){1}/.test(address);
}

function checkUserInfo(result) {
    for (var i in listInfo) {
        if (result[listInfo[i]] == null || !checkValidFullName(result.fullName) || !checkValidPhone(result.phoneNumber) || !checkValidBirthday(result.birthday) || !checkValidAddress(result.address))
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