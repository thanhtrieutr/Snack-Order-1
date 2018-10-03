var utilities = require("../utilities/utilities");
var crud = require("../utilities/databaseCRUD");

function deleteOneUser(request, response) {
    var accountArray;
    crud.readDatabase("account", function(item) { 
        accountArray  = item;
    });

    utilities.collectDataFromPost(request, result => {
        var position = -1;
        for (var i in accountArray) {
            if (result.id == accountArray[i].id) {
                position = i;
                break;
            }    
        }
        if (position == -1) {
            response.end("Cannot delete non-exist user");
        }
        else {
            crud.deleteOneDocument("account" ,accountArray[position], callback);
            response.end("Delete successfully");
        }
    });
}
module.exports = {
    deleteOneUser: deleteOneUser
}