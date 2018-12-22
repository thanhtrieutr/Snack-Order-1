import {API_ROOT} from '../../../api-config'

var token = localStorage.getItem("token");

export function logOut(history, callback) {
    localStorage.removeItem("currentAccount");
    removeTokenOnServe(token, result => {
        console.log(result);
        if (result !== false) {
            localStorage.removeItem('token');
            history.push('/login');
            callback(true);
        }
        else {
            callback(false);
        }
    });
    
}

function removeTokenOnServe(token, callback) {
    var obj = {token: token};
    fetch(`${API_ROOT}/user-controller/remove-token`,{
        method: "POST",
        body: JSON.stringify(obj)
    }).then(response => {
        if (response.status === 200) {
            var result = response;
            console.log(result);
            if (result === false) callback(false);
            else callback(result);
        }
    }); 
}