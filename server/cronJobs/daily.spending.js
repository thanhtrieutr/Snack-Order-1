
var schedule = require('node-schedule');
var dailyModel = require('../schema/daily-schema');
var orderModel = require('../schema/order-schema');
var crud = require('../utilities/databaseCRUD');

module.exports = schedule.scheduleJob('0 0 0 * * *', function(){
    var dailyTotal = 0;
    var getOrder = new Promise((resolve, reject) => {
        var todayStart = new Date();
        todayStart.setHours(0,0,0,0);
        todayStart.setDate(todayStart.getDate() - 1);
        var todayEnd = new Date();
        todayEnd.setHours(23,59,59,999);
        todayEnd.setDate(todayEnd.getDate() - 1);
        debugger;
        var condition = {time: {$gte: todayStart, $lte: todayEnd}};
        crud.getOrders(orderModel, condition, (result, err) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });

    getOrder.then(order => {
        debugger;
        for (var i = 0; i<order.length ; i++) {
            dailyTotal += order[i].actualTotalPrice;
        }
        return new Promise((reject) => {
            var obj = {spending: dailyTotal}
            crud.createDocument(dailyModel, obj, error => {
                if (error) reject(new Error("Problem with database"));
            });
        });
    }).catch(error => {
        console.log(error);
    });
});
