var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var orderSchema = mongoose.Schema({
    user: ObjectId,
    time: Date,
    estimateTotalPrice: Number,
    actualTotalPrice: Number,
    products: [{
      quantity: Number,
      status: String,
      _id: ObjectId
    }]
});

exports.module = orderSchema;