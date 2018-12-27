// var token = localStorage.getItem("token");
import {API_ROOT} from '../../../api-config'
import {errorAlert} from '../../../helpers/utilities/alert'

function checkToken(token, callback) {
    var obj = {token: token};
    fetch(`${API_ROOT}/user-controller/check-token`,{
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

export function checkLogIn(history, callback) {
    var token = localStorage.getItem("token");
    checkToken(token, result => {
        if (result === false) {
            errorAlert("You haven't logged in");
            history.push("/login");
        }
        else callback(result);
    });
}