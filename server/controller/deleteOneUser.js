var utilities = require("../utilities/utilities");
var crud = require("../utilities/databaseCRUD");

function deleteAccount(request, response, accountArray) {
    utilities.collectDataFromPost(request, result => {
        var position = -1;
        console.log(accountArray.length);
        for (var i in accountArray) {
            console.log(accountArray[i]._id);
            if (result._id == accountArray[i]._id) {
                position = i;
                break;
            }    
        }
        if (position == -1) {
            response.end("Cannot delete non-exist user");
        }
        else {
            crud.deleteOneDocument("account" ,accountArray[position]);
            response.end("Delete successfully");
        }
    });
}
function deleteOneUser(request, response) {
    var accountArray;
    crud.readDatabase("account", function(item) { 
        accountArray  = item;
        deleteAccount(request, response, accountArray);
    });
}
module.exports = {
    deleteOneUser: deleteOneUser
}