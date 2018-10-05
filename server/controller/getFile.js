var saveFile = require("../controller/savePhoto");
var utilities = require("../utilities/utilities")

function getFile(request, response) {
    utilities.collectDataFromPost(request, result => {
        var fileName = result.name;
        for (var i = 0; i < 4; i++) {
            var randomNumber = Math.floor((Math.random() * 10000) + 1);
            randomNumber = randomNumber.toString();
            fileName = randomNumber + "-" + fileName;
        }
        console.log(fileName);
        utilities.setResponseHeader(response);
        saveFile.savePhoto(result, fileName, function(err) {
            if (err == false)  {
                response.end("Success!");
            }
            else {
                respones.end("Fail!");
            }
        });
    });
}

module.export =  {
    getFile: getFile
}