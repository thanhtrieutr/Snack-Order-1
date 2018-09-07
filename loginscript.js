function alertDataUser() {

    var user = getById("input-user").value;
    var password = getById("input-password").value;

    var localAccount = JSON.parse(localStorage.getItem("accountArray"));

    if (localAccount == null) {
        localAccount = [];
    }

    var position = findUserPosition(localAccount, user);
    if (position > -1 && user == localAccount[position].user && password == localAccount[position].password) {

        //flag current account
        localStorage.setItem("currentAccount", user);

        //redirect
        alert("Accept account");
        window.location = "order.html";
    }
    else alert("Account don't exist or wrong password");
}

function checkKeyPress(key) {
    if (key.keyCode == 13) {
        alertDataUser();
    }
}

checkLogInAlready();
addEventListener("keypress",checkKeyPress);
getById("signin-button").addEventListener("click", alertDataUser);