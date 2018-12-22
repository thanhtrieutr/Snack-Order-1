import {API_ROOT} from '../../../api-config'

var token = localStorage.getItem("token");

export function getUserInfo(callback) {
    var obj = {token: token};
    fetch(`${API_ROOT}/user-controller/get-user-info`, {
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

export function sendNewInfo(info,callback) {
    info.token= token;
    fetch(`${API_ROOT}/user-controller/update-password`, {
        method: "POST",
        body: JSON.stringify(info)
    }).then(response => {
        if (response.status === 200) {
            callback(true);
        }
        else {
            callback(false);
        }
    }) 
}






