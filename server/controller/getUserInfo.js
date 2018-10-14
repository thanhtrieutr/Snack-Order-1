var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");
var listInfo = ["fullName", "phoneNumber", "birthday", "address", "avatarAddress"];
function checkToken(request, response, accountArray) {
    utilities.collectDataFromPost(request, result => {
        //position == -1 mean don't exist that account
        var position = -1;
        for (var i in accountArray) {
            let token = Buffer.from(accountArray[i].user).toString('base64');
            if (token == result.token) {
                position = i;
                break;
            }
        }
        utilities.setResponseHeader(response);
        if (position != -1) {
            var obj = {};
            for (var j in listInfo) {
                if (accountArray[position][listInfo[j]] )
                    obj[listInfo[j]] = accountArray[i][listInfo[j]];
            }
            response.end(JSON.stringify(obj));
        }
        else {
            response.end(JSON.stringify(false));
        }
    });
}

module.exports = function (request, response) {
    crud.readDatabase("account", function(accountArray) { 
        checkToken(request, response, accountArray);
    });
}