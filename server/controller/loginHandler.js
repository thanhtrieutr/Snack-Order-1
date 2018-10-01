var crud = require("../utilities/databaseCRUD");
var accountArray;
var utilities = require("../utilities/utilities");
crud.readDatabase("account", function(item) { 
    accountArray  = item;
});

function checkLoginHandler(request, response) {
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

function checkTokenHandler(request, response) {
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

module.exports = {
    checkLogin: checkLoginHandler,
    checkToken: checkTokenHandler
}