function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

function alertDataUser(){
    //localStorage.removeItem("UserArray");
    //localStorage.removeItem("PassArray");
    // get from html
    var User = document.getElementById("inputUser").value;
    var Password = document.getElementById("inputPassword").value;
    var repeatPassword = document.getElementById("inputRepeatPassword").value;

    // alert('User :' + User + '\n' + 'Password: ' + Password  + '\n' + 'RePassword: ' + repeatPassword);

    //check validation
    if (repeatPassword != Password){
        alert("Password and repeat password are not match");
        return;
    }
    if (Password.length <1 || Password.length > 32){
        alert("Password is too long or too short");
        return;
    }
    if (User.length <1 || User.length>100){
        lert("user is not valid");
        return;
    }
    // if (!validateEmail(User)){
    //     alert("Email is not valid");
    //     return;
    // }

    //get from storage
    var localUser, localPassword;
    localUser = JSON.parse(localStorage.getItem("UserArray"));
    localPassword = JSON.parse(localStorage.getItem("PassArray"));
    if (localUser == null){
        localUser = [];
        localPassword = [];
    }
    // alert(localUser);
    // alert(localPassword);
    // alert(localUser.indexOf(User));

    //check exist
    if (localUser.indexOf(User) == -1){

        //change
        localUser.push(User);
        localPassword.push(Password);
        localUser = JSON.stringify(localUser);
        localPassword = JSON.stringify(localPassword);
        localStorage.setItem("UserArray",localUser);
        localStorage.setItem("PassArray",localPassword);

        //flag current account
        localStorage.setItem("currentAccount", User);

        // redirect
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