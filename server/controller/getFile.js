var utilities = require("../utilities/utilities");
var errorHandler = require("../errorHandler/controllerError");

function getFile(request, response) {
    try{
        utilities.collectDataFromPost(request,result => {
            try {
                if (!result.file || !result.fileName || !result.token) {
                    throw new Error ("Wrong Data Input");
                }
                var fileName = utilities.modifyFileName(result.fileName);
                if (fileName == false) {
                    throw new Error ("Wrong Data Input");
                }
                for (var i = 0; i < 4; i++) {
                    var randomNumber = Math.floor((Math.random() * 10000) + 1);
                    randomNumber = randomNumber.toString();
                    fileName = randomNumber + "-" + fileName;
                }
                utilities.savePhoto(fileName, result.file, result.token, function(err) {
                    if (err !== true)  {
                        response.end('../../images/' + fileName);
                    }
                    else {
                        throw new Error ("Problem with saving photo")
                    }
                });
            }
            catch (error) {
                errorHandler(error,response);
                return;
            }
        });
    }
    catch (error) {
        errorHandler(error,response);
        return;
    }
}

module.exports =  {
    getFile: getFile
}