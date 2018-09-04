function checklogin(){
    var currentAccount = localStorage.getItem("currentAccount");
    var localUser = localStorage.getItem("UserArray");
    if (currentAccount==null || localUser.indexOf(currentAccount) == -1){
        alert("You haven't login");
        window.location = "login.html";
    }
    else {
        document.getElementById("user_name").innerHTML = currentAccount+"     ";
        // alert("Current user: " + currentAccount);
    }
}

function logout(){
    localStorage.removeItem("currentAccount");
    // alert("remove succeed");
    window.location = "login.html";
}

function rotate_username(id){
    var element = document.getElementById(id);
    var textNode = element.childNodes[0]; // assuming no other children
    let text = textNode.data;
    if (text.length<=20) return;
    setInterval(() => {
        text = text.substring(1, text.length)+text[0];
        textNode.data = text;
    }, 200);
}

checklogin();
addEventListener("load",rotate_username("user_name"));
document.getElementById("logOutButton").addEventListener('click', logout);