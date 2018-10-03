var MongoClient = require('mongodb').MongoClient;
var urldb = "mongodb://localhost:27017/";
var db;

function connectDatabase(callback) {
    MongoClient.connect(urldb, function(err,dbo) {
        db = dbo;
        callback(dbo.db('snack-order'));
    });
}
    
function readDatabase(collection, callback) {
    connectDatabase(function(dbo) {
        dbo.collection(collection).find({}).toArray(function(err, result) {
            db.close();
            callback(result);
        });
    });
}

function createDocument(collection, object, callback) {
    connectDatabase(function(dbo) {
        dbo.collection(collection).insertOne(object, function(err, result) {
            db.close();
            if (callback) callback();
        });
    });
}

function deleteOneDocument(collection, object, callback) {
    connectDatabase(function(dbo) {
        dbo.collection(collection).deleteOne(object, function(err, result) {
            db.close();
            if (callback) callback();
        });
    });
}

function updateOneDocument(collection, object, newValues, callback) {
    connectDatabase(function(dbo) {
        var newData = {
            $set: newValues
        };
        dbo.collection(collection).updateOne(object, newData, function(err, result) {
            db.close();
            if (callback) callback();
        });
    });
}

module.exports = {
    readDatabase: readDatabase,
    createDocument: createDocument,
    deleteOneDocument: deleteOneDocument,
    updateOneDocument: updateOneDocument
}