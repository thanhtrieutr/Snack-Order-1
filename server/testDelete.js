var utilities = require("./utilities/utilities");
var crud = require("./utilities/databaseCRUD");
var accountArray;
crud.readDatabase("account", function(item) { 
    accountArray  = item;
});

function deleteOneUser(request, response) {
    utilities.collectDataFromPost(request, result => {
        var position = -1;
        for (var i in accountArray) {
            if (result == accountArray[i].id) {
                position = i;
                break;
            }    
        }
        if (position == -1) {
            response.end();
        }
        else {
            crud.deleteOneDocument("account" ,accountArray[position], callback);
            response.end();
        }
    });
}
module.exports = {
    deleteOneUser: deleteOneUser
}