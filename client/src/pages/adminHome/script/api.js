var token = localStorage.getItem("token");

export function getDashboardData(callback) {
    var obj = {token: token};
    fetch("http://127.0.0.1:3000/admin-controller/get-dashboard",{
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







