var mongoose = require('mongoose');

var dailySchema = new mongoose.Schema({
    spending: Number
});

var dailyModel = mongoose.model('daily', dailySchema, 'daily');

module.exports = dailyModel;