//Function findUserPosition:
var http = require("http");
var querystring = require('querystring');
var parseFormdata = require('parse-formdata');
var fs = require('fs');
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
function dosomething(request,callback) {
    let binary;
    let str = [];
    request.on('data', chunk => {
        str.push(chunk);
    });
    debugger;
    request.on('end', () => {
        binary = Buffer.concat(str);
        str=str.toString();
    var boundry = '--' + request.headers["content-type"].substring(request.headers["content-type"].indexOf('=')+1, request.headers["content-type"].length);
 
    // Initialization
    var request_data = {};
    index = 0;
 
    while (str.indexOf(boundry, index) != -1) {
        index += boundry.length;
        i = str.indexOf(" name=\"",index);
        j = str.indexOf("\"",i+7);
        name = str.substring(i+7,j);
        var value = {};
        if (str.charAt(j+1)==';') {
            debugger;
            value["type"] = "file";
            console.log(value["type"])
            i = j + 3;
            j = str.indexOf("\"",i+14);
            filename = str.substring(i+10, j);
            value["filename"] = filename;
            console.log(value["filename"])
            i = j + 17;
            j = str.indexOf("\r", i);
            contentType = str.substring(i, j);
            value["content-type"] = contentType;
            i = j + 4;
            j = str.indexOf(boundry, i)
            fileContent = str.substring(i, j);
            value["content"] = fileContent;
        } else {
            value["type"] = "field";
            i = j + 5;
            j = str.indexOf("\r\n" + boundry,i);
            // j=i;
            value["content"] = str.substring(i,j);
        }
        index = str.indexOf(boundry, index) + 2;
        request_data[name] = value;
    }
    // var buf = new Buffer(value["content"], 'base64');
    // console.log(value["content"].toString());
    fs.writeFile('imageString.jpg', value['content']);
    fs.writeFile('imageBinary.jpg', binary);
    callback();
    // callback(request_data);
    });
 }
 
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
}