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
    else return /\b(?:(?:0[1-9]|1\d|2[0-8]|[1-9])\/(?:0?2)\/(?:\d+)|(?:0[1-9]|1\d|2\d|[1-9])\/(?:0?2)\/(?:(?:\d*?(?:(?:0[48]|[13579][26]|[2468][048])|(?:(?:[02468][048]|[13579][26])00))|[48]00|[48])(?=\D|\b))|(?:0[1-9]|1\d|2\d|30|[1-9])\/(?:0?[469]|11)\/(?:\d+)|(?:0[1-9]|1\d|2\d|3[01]|[1-9])\/(?:0?[13578]|1[02])\/(?:\d+))\b/.test(birthday);
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
        try{
            if (!result.token || Object.keys(result).length != 5 || checkUserInfo(result) == false) {
                throw new Error ("Wrong Data Input");
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
                    throw new Error ("Authentication Error");
                }
            })
        }
        catch(error) {
            errorHandler(error,response);
            return;
        }
    })
}