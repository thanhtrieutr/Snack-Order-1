var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var listInfo = ["fullName", "phoneNumber", "birthday", "address"];
var errorHandler = require("../errorHandler/controllerError");

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
    var collectClient = new Promise(function(resolve, reject) {
        utilities.collectDataFromPost(request, result =>{
            if (result instanceof Error) {
                reject(new Error ("Wrong Data Input"));
            }
            if (typeof(result) != "object" || result == null) {
                reject(new Error ("Wrong Data Input"));
            }
            if (!result.token || Object.keys(result).length != 5 || checkUserInfo(result) == false) {
                reject (new Error ("Wrong Data Input"));
            }
            resolve(result);
        });
    });

    collectClient.then(result => {
        return new Promise((resolve, reject) => {
            var queryObj = {token: result.token};
            crud.readOneDocument("account", queryObj, account => {
                if (account == null) {
                    reject(new Error("Account Doesn't Exist"));
                }
                resolve(result);
            });
        });
    }).then(result => {
        crud.updateOneDocument("account", {token: result.token}, result, function(error) {
            if (error) {
                reject(error);
            }
            response.end("Update Successful");
        });
    }).catch(error=> {
        errorHandler(error,response);
    });    
}