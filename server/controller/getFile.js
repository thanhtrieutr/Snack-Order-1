// var saveFile = require("../controller/savePhoto");
var utilities = require("../utilities/utilities")

function getFile(request, response) {
    utilities.setResponseHeader(response);
    utilities.collectDataFromPost(request,result => {
        if (error) {
            response.end(error);
            return;
        }
        console.log(result);
        var fileName = result.name;
        for (var i = 0; i < 4; i++) {
            var randomNumber = Math.floor((Math.random() * 10000) + 1);
            randomNumber = randomNumber.toString();
            fileName = randomNumber + "-" + fileName;
        }
        console.log(fileName);
        
        saveFile.savePhoto(fileName, result.file, result.token, function(err) {
            if (err == false)  {
                response.end("Success!");
            }
            else {
                respones.end("Fail!");
            }
        });
    });
}

module.exports =  {
    getFile: getFile
}