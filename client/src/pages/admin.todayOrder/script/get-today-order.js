function getTodayOrder(callback) {
    var token = localStorage.getItem('token');
    fetch('http://127.0.0.1:3000/admin-controller/get-today-order', {
        method: 'GET', // POST, DELETE, PUT, GET
        headers: {
            'token': token
        }
    }).then(response => {
        if (response.status === 200) {
            response.json().then(orderList => callback(orderList));
        }
        else {
            callback(false)
        }
    })
}

module.exports = getTodayOrder;