// const errorHandler = require('express').Router();
const fs = require('fs');
const notifier = require('node-notifier');

function writeToLog(error) {
    var time = new Date();
    var errorStr = time + ":\n";
    errorStr += error.stack + "\n\n";
    fs.appendFile('./errorLog.txt', errorStr, function (err) {
        if (err) throw err;
    });
}

function errorNotification(err, str, req) {
    var title = 'Error in ' + req.method + ' ' + req.url;

    writeToLog(err);

    notifier.notify({
        title: title,
        stack: err,
        message: str
    });
}

module.exports = errorNotification;