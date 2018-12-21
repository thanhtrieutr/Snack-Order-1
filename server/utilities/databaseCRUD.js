// var MongoClient = require('mongodb').MongoClient;
// var db;
var mongoose = require("mongoose");
if (process.env.ENV =="production") {
    var urldb = "mongodb://test:test1234@ds021356.mlab.com:21356/testdata";
}
else {
    var urldb = "mongodb://localhost:27017/snack-order";
}
var accountModel = require("../schema/account-schema");
var productModel = require("../schema/product-schema");

function connectDatabase(callback) {
    console.log("Data: " + urldb);
    mongoose.connect(urldb,{ useNewUrlParser: true },(err)=>{
        if (callback) callback(err);
    });
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
        if (callback) callback(err);
    });
}

function deleteOneDocument(myModel, object, callback) {
    var obj = new myModel;
    Object.assign(obj, object);
    obj.remove(function(err) { 
        if (callback) callback(err);
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
    });
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

function deleteOneCollection(myModel, callback) {
    myModel.deleteMany({}, function(err) {
        if (callback) callback(err);
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
    getOrders:getOrders,
    deleteOneCollection:deleteOneCollection
};