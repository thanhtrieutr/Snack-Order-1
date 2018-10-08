//Function findUserPosition:
var http = require("http");
var querystring = require('querystring');
var fs = require('fs');
var path = require('path');
var crud = require('../utilities/databaseCRUD');
// var parseFormdata = require('parse-formdata');

function findValidUserPosition(accountList, user) {
    for (var i in accountList) {
        if (accountList[i].user == user.user && accountList[i].password == user.password) {
            return i;
        }
    }
    return -1;
}
function collectDataFromPost(request, callback) {
    let body = '';
    // collect data
    request.on('data', chunk => {
        body += chunk.toString();
    });
    //collect done
    request.on('end', () => {
        try {
            body = JSON.parse(body);
        }
        catch (error) {
            console.log(`There is error: ${error} at parse data\n`);
        }
        if (callback) callback(body);
    });
}

function savePhoto(filename, data, token, callback) {
    var checkWriteFile = false;
    var filePath = '../../images/' + filename;
    console.log(filePath);
    var data = data.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');
    fs.writeFile(path.join(__dirname,'../../images/' + filename), buf, function(err) {
        debugger
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
        for (var i in accountArray)
        {
            let currentToken = Buffer.from(accountArray[i].user).toString('base64');
            if (token == currentToken){
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
        debugger
        var avatarValue = {
            avatarAddress: filePath
        };
        debugger
        crud.updateOneDocument("account", accountArray[position], avatarValue, function() {
            err = true;
            return;
        });
    });
    
}

module.exports = {
    savePhoto: savePhoto 
}

// function dosomething(request,callback) {
//     let binary;
//     let str = [];
//     request.on('data', chunk => {
//         str.push(chunk);
//     });
//     debugger;
//     request.on('end', () => {
//         binary = Buffer.concat(str);
//         str=str.toString();
//     var boundry = '--' + request.headers["content-type"].substring(request.headers["content-type"].indexOf('=')+1, request.headers["content-type"].length);
 
//     // Initialization
//     var request_data = {};
//     index = 0;
 
//     while (str.indexOf(boundry, index) != -1) {
//         index += boundry.length;
//         i = str.indexOf(" name=\"",index);
//         j = str.indexOf("\"",i+7);
//         name = str.substring(i+7,j);
//         var value = {};
//         if (str.charAt(j+1)==';') {
//             debugger;
//             value["type"] = "file";
//             console.log(value["type"])
//             i = j + 3;
//             j = str.indexOf("\"",i+14);
//             filename = str.substring(i+10, j);
//             value["filename"] = filename;
//             console.log(value["filename"])
//             i = j + 17;
//             j = str.indexOf("\r", i);
//             contentType = str.substring(i, j);
//             value["content-type"] = contentType;
//             i = j + 4;
//             j = str.indexOf(boundry, i)
//             fileContent = str.substring(i, j);
//             value["content"] = fileContent;
//         } else {
//             value["type"] = "field";
//             i = j + 5;
//             j = str.indexOf("\r\n" + boundry,i);
//             // j=i;
//             value["content"] = str.substring(i,j);
//         }
//         index = str.indexOf(boundry, index) + 2;
//         request_data[name] = value;
//     }
//     // var buf = new Buffer(value["content"], 'base64');
//     // console.log(value["content"].toString());
//     fs.writeFile('imageString.jpg', value['content']);
//     fs.writeFile('imageBinary.jpg', binary);
//     callback();
//     // callback(request_data);
//     });
//  }
 
function collectDataFromPostFormData(request, callback) {
    dosomething(request, () => {
        callback();
    });
    // parseFormdata(request, function (err, data) {
    //     if (err) throw err
    //     console.log('fields:', data.fields)
    //     data.parts.forEach(function (part) {
    //       console.log('part:', part.fieldname)
    //     })
    // })
}

function setResponseHeader(response) {
    response.statusCode = 200;
    response.setHeader('Content-type', 'application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');
}

module.exports = {
    findValidUserPosition: findValidUserPosition,
    collectDataFromPost: collectDataFromPost,
    collectDataFromPostFormData: collectDataFromPostFormData,
    setResponseHeader: setResponseHeader,
    savePhoto : savePhoto
}