var token = localStorage.getItem("token");

function checkToken(token, callback) {
    var obj = {token: token};
    fetch("http://127.0.0.1:3000/user-controller/check-token",{
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

export function checkLogIn(history, callback) {
    var token = localStorage.getItem("token");
    checkToken(token, result => {
        if (result == false) {
            alert("You haven't logged in");
            history.push("/login");
        }
        else callback(result);
    });
}