var crud = require("../utilities/databaseCRUD");
var utilities = require("../utilities/utilities");

function deleteToken(request, response) {
    crud.readDatabase("account", (accountArray) => {
        utilities.collectDataFromPost(request, (token) => {
            var position = utilities.findAccountByToken(accountArray, token);
            if (position == -1) {
                response.end("Fail!");
                return;
            }
            else {
                utilities.createToken((newToken) => {
                    newToken += Buffer.from(accountArray[position].user).toString('base64');
                    var currentId = accountArray[position]._id;
                    crud.updateOneDocument("account", {_id: currentId}, {token: newToken}, () => {
                        response.end("Success!"); 
                    });
                });
            }
        });
    });
}

module.exports = {
    deleteToken: deleteToken
};