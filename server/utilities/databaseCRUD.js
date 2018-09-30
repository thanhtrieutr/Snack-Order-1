var MongoClient = require('mongodb').MongoClient;
var urldb = "mongodb://localhost:27017/";
var db;

function Connect(callback) {
    MongoClient.connect(urldb, {useNewUrlParser:true}, function(err,dbo) {
        db = dbo;
        callback(dbo.db("Snack-Order"));
    });
}

function Read(collection, callback) {
    Connect(function(dbo) {
        dbo.collection(collection).find({}).toArray(function(err, result) {
            debugger;
            callback(result);
            db.close();
        });
    });
}

function CreateDocument(collection, object) {
    Connect(function(dbo) {
        dbo.collection(collection).insertOne(object, function(err, result) {
            db.close();
        });
    });
}

function Delete1Document(collection, object) {
    Connect(function(dbo) {
        dbo.collection(collection).deleteOne(object, function(err, result) {
            db.close();
        });
    });
}

function Update1Document(collection, object, newValues) {
    Connect(function(dbo) {
        var newData = {
            $set: newValues
        };
        dbo.collection(collection).updateOne(object, newData, function(err, result) {
            debugger;
            db.close();
        });
    });
}

module.exports = {
    Read: Read,
    CreateDocument: CreateDocument,
    Delete1Document: Delete1Document,
    Update1Document: Update1Document
}