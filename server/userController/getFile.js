var utilities = require("../utilities/utilities");
var multer = require('multer');
var crud = require("../utilities/databaseCRUD");
var express = require('express');
var appGetFile = express();
var path = require('path');
var accountModel = require("../schema/account-schema");

//save to disk at image folder
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, '../../client/src/assets/images/'));
    },
    filename: function (req, file, callback) {
        req.newFileName = utilities.modifyFileName(file.originalname);
        callback(null, req.newFileName);
    }
});

//receive + parse (by multer) uploaded file
var upload = multer({storage: storage, fileFilter: utilities.fileFilter}).single('file');
var uploadFile = function(request, response, next) {
    upload(request, response, function (err) {
        if (err instanceof multer.MulterError) {
          next(err);
          return;
        } else if (err) {
            next(err);
            return;
        }
        next();
    });
};

appGetFile.post('/', utilities.authenticationUserByHeader, uploadFile, (request, response) => {
    //save link image to mongodb of that account
    var avatarValue = {
        avatarAddress: '/static/images/'+ request.newFileName
    };
    crud.updateOneDocument(accountModel, {_id: request.account._id}, avatarValue, function() {
        response.end('../../images/' + request.newFileName);
        return;
    });
});

module.exports =  {
    getFile: appGetFile
};
