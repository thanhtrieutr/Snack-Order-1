function alertDataUser(){

    var User = document.getElementById("inputUser").value;
    var Password = document.getElementById("inputPassword").value;
    alert('User :' + User + '\n' + 'Password: ' + Password);

    var localUser, localPas;
    localUser = JSON.parse(localStorage.getItem("UserArray"));
    localPas = JSON.parse(localStorage.getItem("PassArray"));

    if (localUser == null){
        localUser = [];
        localPas = [];
    }

    var pos = localUser.indexOf(User);
    if (pos > -1 && User == localUser[pos] && Password == localPas[pos]){

        //flag current account
        localStorage.setItem("currentAccount", User);

        //redirect
        alert("Accept account");
        window.location = "order.html";
    }
    else alert("Account don't exist or wrong password");
}
document.getElementById("signinbtn").addEventListener("click", alertDataUser);