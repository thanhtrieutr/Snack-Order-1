function createNewAccount(user, password){
    var obj = {};
    obj.user = user;
    obj.password = password;
    obj.cartArray = [];
    return obj;
 }

 function findUserPos(localAccount, user){
    for (var i in localAccount){
        if (localAccount[i].user == user)
            return i;
    }
    return -1;
 }

function alertDataUser(){

    var User = document.getElementById("inputUser").value;
    var Password = document.getElementById("inputPassword").value;
    // alert('User :' + User + '\n' + 'Password: ' + Password);

    var localAccount = JSON.parse(localStorage.getItem("accountArray"));

    if (localAccount == null)
        localAccount = [];

    var pos = findUserPos(localAccount, User);
    if (pos > -1 && User == localAccount[pos].user && Password == localAccount[pos].password){

        //flag current account
        localStorage.setItem("currentAccount", User);

        //redirect
        alert("Accept account");
        window.location = "order.html";
    }
    else alert("Account don't exist or wrong password");
}

function checklogin(){
    var currentAccount = localStorage.getItem("currentAccount");
    var localAccount = JSON.parse(localStorage.getItem("accountArray"));
    if (currentAccount==null || findUserPos(localAccount, currentAccount) == -1) {
        let i;
    }
    else {
        alert("You already login");
        window.location = "order.html";
    }
}
function check_key_press(key){
    var keycode=key.keyCode;
    if (keycode==13) alertDataUser();
}

checklogin();
addEventListener("keypress",check_key_press);
document.getElementById("signinbtn").addEventListener("click", alertDataUser);