var utilities = require("../utilities/utilities");

function getFile(request, response) {
    utilities.setResponseHeader(response);
    utilities.collectDataFromPost(request,result => {
        if (!result.file || !result.fileName || !result.token) {
            response.end("Fail!");
        }
        console.log(result);
        var fileName = result.fileName;
        for (var i = 0; i < 4; i++) {
            var randomNumber = Math.floor((Math.random() * 10000) + 1);
            randomNumber = randomNumber.toString();
            fileName = randomNumber + "-" + fileName;
        }
        console.log(fileName);
        
        utilities.savePhoto(fileName, result.file, result.token, function(err) {
            debugger
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