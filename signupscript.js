function alertDataUser(){
    // localStorage.removeItem("UserArray");
    // localStorage.removeItem("PassArray");
    // get from html
    var User = document.getElementById("inputUser").value;
    var Password = document.getElementById("inputPassword").value;
    var repeatPassword = document.getElementById("inputRepeatPassword").value;

    alert('User :' + User + '\n' + 'Password: ' + Password  + '\n' + 'RePassword: ' + repeatPassword);
    if (repeatPassword != Password){
        alert("Password and repeat password are not same");
        return;
    }
    

    //get from storage
    var localUser, localPassword;
    localUser = JSON.parse(localStorage.getItem("UserArray"));
    localPassword = JSON.parse(localStorage.getItem("PassArray"));
    if (localUser == null){
        localUser = [];
        localPassword = [];
    }
    alert(localUser);
    alert(localPassword);
    alert(localUser.indexOf(User));

    //check exist
    if (localUser.indexOf(User) == -1){
        localUser.push(User);
        localPassword.push(Password);
        localUser = JSON.stringify(localUser);
        localPassword = JSON.stringify(localPassword);
        localStorage.setItem("UserArray",localUser);
        localStorage.setItem("PassArray",localPassword);
        alert("signup success");
        window.location = "order.html";
    }
    else {
        alert("User conflict");
    }
    // localStorage.setItem("User", User);
    // localStorage.setItem("Password", Password);
    
}
document.getElementById("signupbtn").addEventListener("click", alertDataUser);