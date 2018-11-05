var utilities = require("../utilities/utilities");
var errorHandler = require("../errorHandler/controllerError");

function getFile(request, response) {
    var promise = new Promise(function(resolve, reject) {
        var result = request.body;
        if (result instanceof Error) {
            reject(result);
        }
        if (!result.file || !result.fileName || !result.token) {
            reject (new Error ("Wrong Data Input"));
        }
        var fileName = utilities.modifyFileName(result.fileName);
        if (fileName == false) {
            reject (new Error ("Wrong Data Input"));
        }
        console.log(fileName);
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
                reject (new Error ("Problem with saving photo"));
            }
        }); 
    });
    promise.catch (error => {
        errorHandler(error,response);
        return;
    });
}

module.exports =  {
    getFile: getFile
}