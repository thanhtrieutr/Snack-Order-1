import {API_ROOT} from '../../../api-config'

function submitStatus(orderList, callback) {
    var token = localStorage.getItem('token');
    
    var sendObject = {
        updateList: []
    };
    //productId, orderId, user, status
    for (var i in orderList) {
        var obj = {};
        obj.productId = orderList[i].productId.toString();
        obj.orderId = orderList[i].orderId;
        obj.user = orderList[i].user;
        obj.status = orderList[i].status;
        sendObject.updateList.push(obj);
    }

    fetch(`${API_ROOT}/admin-controller/change-order-status`, {
        method: 'POST', // POST, DELETE, PUT, GET
        headers: {
            'token': token
        },
        body: JSON.stringify(sendObject)
    }).then(response => {
        if (response.status === 200) {
            callback(true);
        }
        else {
            callback(false)
        }
    })
} 

export {submitStatus};