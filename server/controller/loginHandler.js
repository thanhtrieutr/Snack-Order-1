var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");

function checkLogin(request, response, accountArray) {
    utilities.collectDataFromPost(request, result => {
        utilities.setResponseHeader(response);
        var position = utilities.findValidUserPosition(accountArray, result);
        if (position == -1) {
            response.end(JSON.stringify(false));
        }
        else {
            var token = Buffer.from(accountArray[position].user).toString('base64');
            response.end(JSON.stringify(token));
        }
    });
}
function checkLoginHandler(request, response) {
    // don't read 1 time at beginning because accounts can change
    crud.readDatabase("account", function(accountArray) { 
        checkLogin(request, response, accountArray);
    });
}

function checkToken(request, response, accountArray) {
    utilities.collectDataFromPost(request, result => {
        //position == -1 mean don't exist that account
        var position = -1;
        for (var i in accountArray) {
            let token = Buffer.from(accountArray[i].user).toString('base64');
            if (token == result) {
                position = i;
                break;
            }
        }
        utilities.setResponseHeader(response);
        if (position != -1) {
            response.end(JSON.stringify(accountArray[position].user));
        }
        else {
            response.end(JSON.stringify(false));
        }
    });
}
function checkTokenHandler(request, response) {
    // don't read 1 time at beginning because accounts can change
    crud.readDatabase("account", function(accountArray) { 
        checkToken(request, response, accountArray);
    });
}

module.exports = {
    checkLogin: checkLoginHandler,
    checkToken: checkTokenHandler
}