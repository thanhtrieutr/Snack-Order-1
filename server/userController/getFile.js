var utilities = require("../utilities/utilities");

function getFile(request, response, next) {
    var promise = new Promise(function (resolve, reject) {
        var result = request.body;
        if (result instanceof Error) {
            reject(result);
        }
        if (!result.file || !result.fileName || !result.token) {
            reject(new Error("Wrong Data Input"));
        }
        var fileName = utilities.modifyFileName(result.fileName);
        if (fileName == false) {
            reject(new Error("Wrong Data Input"));
        }
        console.log(fileName);
        for (var i = 0; i < 4; i++) {
            var randomNumber = Math.floor((Math.random() * 10000) + 1);
            randomNumber = randomNumber.toString();
            fileName = randomNumber + "-" + fileName;
        }
        utilities.savePhoto(fileName, result.file, result.token, function (err) {
            if (err !== true) {
                response.end('../../images/' + fileName);
            } else {
                reject(new Error("Problem with saving photo"));
            }
        });
    });
    promise.catch(error => {
        next(error);
    });
}

module.exports = {
    getFile: getFile
};