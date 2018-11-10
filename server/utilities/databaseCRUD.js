// var MongoClient = require('mongodb').MongoClient;
// var db;
var mongoose = require("mongoose");
if (process.env.ENV =="production") {
    var urldb = "mongodb://test:123456789a@ds119523.mlab.com:19523/snack-order";
}
else {
    var urldb = "mongodb://localhost:27017/snack-order";
}
var accountModel = require("../schema/account-schema");
var productModel = require("../schema/product-schema");

function connectDatabase(callback) {
    mongoose.connect(urldb);
}
    
function readDatabase(myModel, callback) {
    myModel.find(function(err, docs) {
        callback(docs, err);
    });
}

function createDocument(myModel, object, callback) {
    var obj = new myModel;
    Object.assign(obj, object);
    obj.save(function(err) { 
        callback(err);
    });
}

function deleteOneDocument(myModel, object, callback) {
    var obj = new myModel;
    Object.assign(obj, object);
    obj.remove(function(err) { 
        if (err) callback(err);
    });
}

function updateOneDocument(myModel, object, newValues, callback) {
    myModel.findOneAndUpdate(object, newValues,function(err) {
        if (callback) callback(err);
    });
}

function readOneDocument(myModel, object, callback) {
    myModel.findOne(object, function(err, docs) { 
        callback(docs, err);
    })
}

function readSomeDocument(myModel, object, callback) {
    myModel.find(object, function(err, docs) {
        callback(docs, err);
    });
}

function readWithLink(collection, query, callback) {
    db.collection(collection).aggregate(query).toArray(function(err, result) {
        callback(result,err);
    });
}

function getOrders(orderModel, object, callback) {
    orderModel.find(object)
    .populate('user')
    .populate('products._id')
    .exec(function (err, docs) {
        callback(docs, err);
    });

}
module.exports = {
    connectDatabase: connectDatabase,
    readDatabase: readDatabase,
    createDocument: createDocument,
    deleteOneDocument: deleteOneDocument,
    updateOneDocument: updateOneDocument,
    readOneDocument: readOneDocument,
    readSomeDocument: readSomeDocument,
    readWithLink: readWithLink,
    getOrders:getOrders
}