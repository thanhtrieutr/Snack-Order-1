function findUserPos(localAccount, user){
    for (var i in localAccount){
        if (localAccount[i].user == user)
            return i;
    }
    return -1;
 }
function checklogin(){
    var currentAccount = localStorage.getItem("currentAccount");
    var localAccount = JSON.parse(localStorage.getItem("accountArray"));
    if (currentAccount==null ||  findUserPos(localAccount, currentAccount) == -1){
        alert("You haven't login");
        window.location = "login.html";
    }
    else {
        document.getElementById("user_name").innerHTML = currentAccount+"     ";
        // alert("Current user: " + currentAccount);
    }
}
checklogin();
