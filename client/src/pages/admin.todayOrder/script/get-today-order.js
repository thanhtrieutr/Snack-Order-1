import {API_ROOT} from '../../../api-config'

function getTodayOrder(callback) {
    var token = localStorage.getItem('token');
    fetch(`${API_ROOT}/admin-controller/get-today-order`, {
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

export default getTodayOrder;