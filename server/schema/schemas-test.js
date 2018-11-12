var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/snack-order');
var db = mongoose.connection;
var accountSchema = require("./account-schema");
var productSchema = require("./product-schema");
var adminAccountSchema = require("./admin-account-schema");
var orderSchema = require("./order-schema");

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected");
});

var account = mongoose.model('account', accountSchema,'account');
var adminAccount = mongoose.model('adminAccount', adminAccountSchema,'adminAccount');
var product = mongoose.model('product', productSchema,'product');
var order = mongoose.model('order', orderSchema,'order');

debugger;
account.find((err,acc) => {
    if (err) return handleError(err);
    console.log(acc);
});

adminAccount.find((err,acc) => {
  if (err) return handleError(err);
  console.log(acc);
});

product.find((err,acc) => {
  if (err) return handleError(err);
  console.log(acc);
});

order.find((err,acc) => {
  if (err) return handleError(err);
  console.log(acc);
});
