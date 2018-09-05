function createNewAccount(user, password){
    var newAccount = {};
    newAccount.user = user;
    newAccount.password = password;
    newAccount.cartArray = [];
    return newAccount;
}

function findUserPosition(localAccount, user){
    for (var i in localAccount){
        if (localAccount[i].user == user) {
            return i;
        }
    }
    return -1;
}

function alertDataUser(){

    var user = document.getElementById("input-user").value;
    var password = document.getElementById("input-password").value;


    var localAccount = JSON.parse(localStorage.getItem("accountArray"));

    if (localAccount == null) {
        localAccount = [];
    }

    var position = findUserPosition(localAccount, user);
    if (position > -1 && user == localAccount[position].user && password == localAccount[position].password){

        //flag current account
        localStorage.setItem("currentAccount", user);

        //redirect
        alert("Accept account");
        window.location = "order.html";
    }
    else alert("Account don't exist or wrong password");
}

function checkLogIn(){
    var currentAccount = localStorage.getItem("currentAccount");
    var localAccount = JSON.parse(localStorage.getItem("accountArray"));
    if (currentAccount != null && findUserPosition(localAccount, currentAccount) != -1) {
        alert("You already login");
        window.location = "order.html";
    }
}
function checkKeyPress(key){
    if (key.keyCode == 13) {
        alertDataUser();
    }
}

checkLogIn();
addEventListener("keypress",checkKeyPress);
document.getElementById("signinbutton").addEventListener("click", alertDataUser);