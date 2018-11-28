var token = localStorage.getItem("token");
var currentUserInfo = {};

export function getUserInfo(callback) {
    var obj = {token: token};
    fetch("http://127.0.0.1:3000/user-controller/get-user-info",{
        method: "POST",
        body: JSON.stringify(obj)
    }).then(response => {
        if (response.status == 200) {
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
    debugger;
    fetch("http://127.0.0.1:3000/user-controller/update-user-info",{
        method: "POST",
        body: JSON.stringify(userInfo)
    }).then(response => {
        if (response.status == 200) {
            callback(true);
        }
        else {
            callback(false);
        }
    }) 
}






