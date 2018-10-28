function checkAdminLogInAlready() {
    var token = { token: localStorage.getItem("token")};
    var http = new XMLHttpRequest();
    http.open('POST', "http://127.0.0.1:3000/admin/check-token", true);
    http.send(JSON.stringify(token));
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert("You have already logged in");
            window.location.href = "/admin";
        }
        //if !200 still stay at login admin page
    }
}
function checkAdminLoginInSever(user, password) {
    var account = {};
    account.user = user; account.password = password;
    var http = new XMLHttpRequest();
    http.open('POST', "http://127.0.0.1:3000/admin/check-login", true);
    http.send(JSON.stringify(account));
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var token = JSON.parse(this.response);
            alertAnswerLogIn(user, token);
        }
        if (this.readyState == 4 && this.status != 200) {
            alertError(this.response);
        } 
    }
}
function alertAnswerLogIn(user, token) {
    if (token != false) {
        //flag current account      
        //set local account for save cart
        localStorage.setItem("adminAccount", user);
        localStorage.setItem("token", token);
        //redirect
        alert("Login Success");
        window.location.href = "/admin";
    }
}
function alertDataUser() {
    var user = getById("input-user").value;
    var password = getById("input-password").value;
    checkAdminLoginInSever(user, password);
}
function checkKeyPress(key) {
    if (key.keyCode == 13) {
        alertDataUser();
    }
}
checkAdminLogInAlready();
addEventListener("keypress",checkKeyPress);
getById("signin-button").addEventListener("click", alertDataUser);