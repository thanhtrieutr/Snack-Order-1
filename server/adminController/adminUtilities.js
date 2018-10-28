var http = require("http");
var fs = require('fs');
var path = require('path');
var crud = require('../utilities/databaseCRUD');
var crypto = require("crypto");

function savePhoto(object, filename, data, callback) {
    if (typeof(filename) != 'string' || typeof(data) != 'string') {
        callback("not valid data");
        return;
    }
    var filePath = '../images/' + filename;
    console.log(filePath);
    var data = data.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');
    fs.writeFile(path.join(__dirname,'../../images/' + filename), buf, function(err) {
        if (err) {
            return callback(err);
        }
        checkWriteFile = true;
        var avatarValue = {
            img: filePath
        };
        crud.updateOneDocument("product", object, avatarValue, function(err) {
            if (err) callback(err);
        });
        return callback(err);
    });
}

module.exports = {
    savePhoto: savePhoto
}