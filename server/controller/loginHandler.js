var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");

function checkLogin(request, response, accountArray) {
    utilities.collectDataFromPost(request, (result) => {
        utilities.setResponseHeader(response);
        var position = utilities.findValidUserPosition(accountArray, result);
        if (position == -1) {
            response.end(JSON.stringify(false));
        }
        else {
            utilities.createToken((newToken) => {
                newToken += Buffer.from(accountArray[position].user).toString('base64');
                var currentId = accountArray[position]._id;
                crud.updateOneDocument("account", {_id: currentId}, {token: newToken}, () => {
                    response.end(JSON.stringify(newToken)); 
                    console.log("Current token: " + newToken);
                });
            });
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
        var position = utilities.findAccountByToken(accountArray, result);
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