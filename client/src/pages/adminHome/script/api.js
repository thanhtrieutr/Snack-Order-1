import {API_ROOT} from '../../../api-config'

var token = localStorage.getItem("token");

export function getDashboardData(callback) {
    var obj = {token: token};
    fetch(`${API_ROOT}/admin-controller/get-dashboard`,{
        method: "POST",
        body: JSON.stringify(obj)
    }).then(response => {
        if (response.status === 200) {
            response.json().then(function(data) {
                callback(data);
            });
        }
        else {
            callback(false);
        }
    }) 
}







