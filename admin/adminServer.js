checkAdminLogin();
function checkAdminLogin() {
    var token = {token: localStorage.getItem("token")};
    var http = new XMLHttpRequest();
    http.open('POST', "http://127.0.0.1:3000/admin-controller/check-token", true);
    http.send(JSON.stringify(token));
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var admin = localStorage.getItem("adminAccount");
            document.getElementById("admin-name").innerHTML = admin;
        }
        if (this.readyState == 4 && this.status != 200) {
            alert("You haven't logged in");
            window.location.href = "/admin/login";
        }
    }
}
function removeAdminTokenOnServe(token) {
    var http = new XMLHttpRequest();
    http.open("POST", "http://127.0.0.1:3000/admin-controller/remove-token", true);
    obj = {token: token};
    http.send(JSON.stringify(obj));
    http.onreadystatechange = function() {
        if (this.readyState == 4) {
            var result = this.response;
            console.log(result);
        }
    }
}
function logoutAdmin() {
    localStorage.removeItem("adminAccount");
    var token = localStorage.getItem("token");
    removeAdminTokenOnServe(token);
    localStorage.removeItem('token');
    window.location.href = "/admin/login";
}