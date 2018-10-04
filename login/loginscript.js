function checkLoginInSever(user, password) {
    var account = createNewAccount(user, password);
    var http = new XMLHttpRequest();
    http.open('POST', "http://127.0.0.1:3000/checkLogin", true);
    http.send(JSON.stringify(account));
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var token = JSON.parse(this.response);
            alertAnswerLogIn(user, password, token);
        }
    }
}
function alertAnswerLogIn(user, password, token) {
    if (token != false) {
        //flag current account
        
        //set local account for save cart
        var localAccount = [];

        var account = {};
        account.user = user;
        account.cartArray = [];
        account.token = token;
        localAccount.push(account);
        // localAccount.push(createNewAccount(user, password));
        localStorage.setItem("accountArray", JSON.stringify(localAccount));
        localStorage.setItem("currentAccount", user);
        localStorage.setItem("token", token);
        //redirect
        alert("Accept account");
        window.location.href = "/";
    }
    else {
        alert("Account don't exist or wrong password");
    }
}
function alertDataUser() {
    var user = getById("input-user").value;
    var password = getById("input-password").value;
    checkLoginInSever(user, password);
}

function checkKeyPress(key) {
    if (key.keyCode == 13) {
        alertDataUser();
    }
}

function goToSignup() {
    window.location.href = "/signup";
}

checkLogInAlready();
addEventListener("keypress",checkKeyPress);
getById("signin-button").addEventListener("click", alertDataUser);
getById("link-signup").addEventListener("click", goToSignup);