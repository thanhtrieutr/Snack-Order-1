import {API_ROOT} from '../../../api-config'

var token = localStorage.getItem("token");
// var currentUserInfo = {};

export function getUserInfo(callback) {
    var obj = {token: token};
    fetch(`${API_ROOT}/user-controller/get-user-info`,{
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

export function sendNewUserInfo(userInfo,callback) {
    userInfo.token= token;
    fetch(`${API_ROOT}/user-controller/update-user-info`,{
        method: "POST",
        body: JSON.stringify(userInfo)
    }).then(response => {
        if (response.status === 200) {
            callback(true);
        }
        else {
            callback(false);
        }
    }) 
}






