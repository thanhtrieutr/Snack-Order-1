var utilities = require("../utilities/utilities");
var errorHandler = require("../errorHandler/controllerError");
var multer = require('multer');
var crud = require("../utilities/databaseCRUD")
var express = require('express');
var appGetFile = express();

var newFileName;
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname,'../../images'));
    },
    filename: function (req, file, callback) {
        newFileName = utilities.modifyFileName(file.fieldname);
        callback(null, newFileName);
    }
})
function fileFilter (req, file, callback){
    var type = file.mimetype;
    var typeArray = type.split("/");
    if (typeArray[0] == "image") {
      callback(null, true);
    }else {
      callback(new Error ("Wrong Data Input"), false);
    }
}
var upload = multer({storage: storage, fileFilter: fileFilter}).single('user-image');
var uploadFile = function(request, response, next) {
    upload(request, response, function (err) {
        if (err instanceof multer.MulterError) {
          errorHandler(err, response);
          return;
        } else if (err) {
            errorHandler(err, response);
            return;
        }
        next();
    })
}
var authentication = function(request, response, next) {
    var obj = {token : request.header['token']};
    crud.readOneDocument("account", obj, account => {
        if (account == null) {
            errorHandler(new Error("Authentication Error"),response);
            return;
        }
        request.account = account;
        next();
    });
}
appGetFile.post('/', authentication, uploadFile, (request, response) => {
    var avatarValue = {
        avatarAddress: '/static/images/'+ newFileName
    };
    crud.updateOneDocument("account", request.account, avatarValue, function() {
        response.end('../../images/' + newFileName);
        return;
    });
});

module.exports =  {
    getFile: appGetFile
}