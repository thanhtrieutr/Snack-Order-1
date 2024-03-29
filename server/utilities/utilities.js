//Function findUserPosition:
var http = require("http");
var fs = require('fs');
var path = require('path');
var crud = require('../utilities/databaseCRUD');
var crypto = require("crypto");
var bodyParser = require('body-parser');

function findValidUserPosition(accountList, user) {
    for (var i in accountList) {
        if (accountList[i].user == user.user && accountList[i].password == user.password) {
            return i;
        }
    }
    return -1;
}

function savePhoto(filename, data, token, callback) {
    if (typeof(filename) != 'string' || typeof(token) != 'string' || typeof(data) != 'string') {
        callback("not valid data");
        return;
    }
    var filePath = '/static/images/' + filename;
    var data = data.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');
    fs.writeFile(path.join(__dirname,'../../images/' + filename), buf, function(err) {
        if (err) {
            return callback(err);
        }
        checkWriteFile = true;
        savePath(token, filePath, err);
        return callback(err);
    });
}

function savePath(token, filePath, err) {
    err = true;
    var position = -1;
    crud.readDatabase("account", function(accountArray) {
        var checkUser = 0;
        for (var i in accountArray) {
            let currentToken = accountArray[i].token;
            if (token == currentToken) {
                checkUser = 1;
                position = i;
                currentUser = accountArray[i].user;
                break;
            } 
        }
        if (checkUser == 0) {
            err = false;
            return;
        }
        var avatarValue = {
            avatarAddress: filePath
        };
        crud.updateOneDocument("account", accountArray[position], avatarValue, function() {
            err = true;
            return;
        });
    });
}

function setResponseHeader(response) {
    response.statusCode = 200;
    response.setHeader('Content-type', 'application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');
}

function validateFileName(filename) {
    return filename.replace(/[^a-zA-Z0-9.]/gi, "");
}
  
function authenticateFileName(filename) {
    if (filename.match("\.png$") || filename.match("\.jpg$") || filename.match("\jpeg$")) {
      return true;
    }
    return false;
}

function modifyFileName(filename) {
    if (authenticateFileName(filename)) {
      return validateFileName(filename) 
    } else {
        return false;
    }
}
function generateToken() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(48, (err, buffer) => {
          if (err) {
            reject(err);
          } else {
            resolve(buffer.toString('base64'));
          }
        });
    });
}
async function createToken(callback) {
    var token = await generateToken();
    if (callback) return callback(token);
}

function findAccountByToken(accountArray, newToken) {
    var position = -1;
    for (var i in accountArray) {
        let token = accountArray[i].token;
        if (token == newToken) {
            position = i;
            return position;
        }
    }
    return position;
}

function findObjectById(objList, id) {
    var position = -1;
    for (var i in objList) {
        let currentId = objList[i]._id;
        if (currentId.toString() == id.toString()) {
            position = i;
            return position;
        }
    }
    return position;
}

function cloneObject(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}
function jsonParser(option) {
    if (typeof(option) != 'object') {
        return bodyParser.json({type: "*/*"});
    }
    option.type = "*/*";
    return bodyParser.json(option); 
}
module.exports = {
    findAccountByToken: findAccountByToken,
    createToken: createToken,
    findValidUserPosition: findValidUserPosition,
    setResponseHeader: setResponseHeader,
    savePhoto: savePhoto,
    modifyFileName: modifyFileName,
    findObjectById: findObjectById,
    cloneObject: cloneObject,
    jsonParser: jsonParser
}