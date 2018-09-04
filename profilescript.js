function checklogin(){
    var currentAccount = localStorage.getItem("currentAccount");
    var localUser = localStorage.getItem("UserArray");
    if (currentAccount==null || localUser.indexOf(currentAccount) == -1){
        alert("You haven't login");
        window.location = "login.html";
    }
    else {
        document.getElementById("user_name").innerHTML = currentAccount;
        // alert("Current user: " + currentAccount);
    }
}
checklogin();
