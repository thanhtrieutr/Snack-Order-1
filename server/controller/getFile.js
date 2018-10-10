var utilities = require("../utilities/utilities");

function getFile(request, response) {
    utilities.setResponseHeader(response);
    utilities.collectDataFromPost(request,result => {
        if (!result.file || !result.fileName || !result.token) {
            response.end("Fail!");
        }
        var fileName = utilities.modifyFileName(result.fileName);
        if (fileName == false) {
            response.end("Fail!");
        }
        for (var i = 0; i < 4; i++) {
            var randomNumber = Math.floor((Math.random() * 10000) + 1);
            randomNumber = randomNumber.toString();
            fileName = randomNumber + "-" + fileName;
        }
        utilities.savePhoto(fileName, result.file, result.token, function(err) {
            if (err !== true)  {
                response.end("Success!");
            }
            else {
                response.end("Fail!");
            }
        });
    });
}

module.exports =  {
    getFile: getFile
}