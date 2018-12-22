import {API_ROOT} from '../../../api-config'

export function loadSnack(callback) {
    fetch(`${API_ROOT}/user-controller/get-products`, {
        method: "GET"
    }).then(response => {
        if (response.status === 200) {
            response.json().then(function(data) {
                callback(data);
            });
        }
        else callback(false);
    }); 
}

