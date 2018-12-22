function checkToken(token, callback) {
    fetch('http://127.0.0.1:3000/admin-controller/check-token', {
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

module.exports = {
    checkToken: checkToken
}