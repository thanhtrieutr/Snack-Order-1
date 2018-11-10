var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var orderSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'account' },
  time: Date,
  estimateTotalPrice: Number,
  actualTotalPrice: Number,
  products: [{
    quantity: Number,
    status: String,
    _id: { type: ObjectId, ref: 'product' }
  }]
});

var orderModel = mongoose.model('order', orderSchema, 'order');

module.exports = orderModel;