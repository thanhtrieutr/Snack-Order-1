module.exports = function(error,response) {
    const fs = require('fs');
    var time=new Date();
    fs.appendFile('errorLog.txt', time+":\n"+error.toString()+"\n", function (err) {
        if (err) throw err;
    });
    var errorList = [
        {statusCode: 400, message: "Wrong Data Input"},
        {statusCode: 401, message: "Authentication Error"},
        {statusCode: 404, message: "File not found"},
        {statusCode: 409, message: "Account Existed"},
        {statusCode: 400, message: "Account Doesn't Exist"},
        {statusCode: 500, message: "Problem with saving photo"},
        {statusCode: 500, message: "Problem with database"},
    ];
    for (var i in errorList) {
        if (error.message == errorList[i].message) {
            response.statusCode = errorList[i].statusCode;
            response.setHeader('Content-type', 'text/plain');
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.end(error.message);
            return;
        }
    }
    response.statusCode = 500;
    response.setHeader('Content-type', 'text/plain');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.end(error.message);
}