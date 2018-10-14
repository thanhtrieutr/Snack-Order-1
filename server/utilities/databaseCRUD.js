var MongoClient = require('mongodb').MongoClient;
var db;
if (process.env.ENV == "production") {
    var urldb = "mongodb://test:123456789a@ds119523.mlab.com:19523/snack-order";
}
else {
    var urldb = "mongodb://localhost:27017/";
}
function connectDatabase(callback) {
    console.log(`At ${urldb}`);
    MongoClient.connect(urldb, { useNewUrlParser: true }, function(err,dbo) {
        db = dbo.db('snack-order');
        if (callback) callback();
    });
}
    
function readDatabase(collection, callback) {
    db.collection(collection).find({}).toArray(function(err, result) {
        callback(result);
    });
}

function createDocument(collection, object, callback) {
    db.collection(collection).insertOne(object, function(err, result) {
        if (callback) callback();
    });
}

function deleteOneDocument(collection, object, callback) {
    db.collection(collection).deleteOne(object, function(err, result) {
        if (callback) callback();
    });
}

function deleteOneCollection(collection, callback) {
    db.collection(collection).drop(function(err, deleteOK) {
        if (callback) callback();
    });
}

function updateOneDocument(collection, object, newValues, callback) {
    var newData = {
        $set: newValues
    };
    db.collection(collection).updateOne(object, newData, function(err, result) {
        if (callback) callback();
    });
}

function readOneDocument(collection, object, callback) {
    db.collection(collection).findOne(object , function(err, result) {
        callback(result);
    });
}

module.exports = {
    connectDatabase: connectDatabase,
    readDatabase: readDatabase,
    createDocument: createDocument,
    deleteOneDocument: deleteOneDocument,
    updateOneDocument: updateOneDocument,
    readOneDocument: readOneDocument,
    deleteOneCollection: deleteOneCollection
}