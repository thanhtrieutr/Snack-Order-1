import {API_ROOT} from '../../../api-config'

export function checkToken(token, callback) {
    fetch(`${API_ROOT}/admin-controller/check-token`, {
        method: 'POST', // POST, DELETE, PUT,
        body: JSON.stringify(token) // object
    }).then(response => {
        if (response.status === 200) {
            response.json().then(user => callback(user));
        }
        else {
            callback(false)
        }
    })
}
