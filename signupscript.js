function alertDataUser(){
    //localStorage.removeItem("UserArray");
    //localStorage.removeItem("PassArray");
    // get from html
    var User = document.getElementById("inputUser").value;
    var Password = document.getElementById("inputPassword").value;
    var repeatPassword = document.getElementById("inputRepeatPassword").value;

    // alert('User :' + User + '\n' + 'Password: ' + Password  + '\n' + 'RePassword: ' + repeatPassword);

    //check validation
    if (User.length <6 || User.length > 100){
        alert("Username is too long or too short");
        return;
    }
    else if (!email_check(User)){
        alert("Email is not valid");
        return;
    }
    if (Password.length <8 || Password.length > 16){
        alert("Password is too long or too short");
        return;
    }
    else if (!password_check(Password)){
        alert("Password can only contains characters a->z,A->Z,0->9 and symbol !#$%&'*+-/=?^_`{|}");
        return;
    }
    if (repeatPassword != Password){
        alert("Password and repeat password are not match");
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

 function email_check(user){
    return /^[a-zA-Z0-9!#$%&'*+-/=?^_`{|}]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(user);
 }
 function password_check(password){
    return /^[[a-zA-Z0-9!#$%&'*+-/=?^_`{|}]+$/.test(password);
}
function check_key_press(key)
{
    var keycode=key.keyCode;
    if (keycode==13) alertDataUser();
}

function checklogin(){
    var currentAccount = localStorage.getItem("currentAccount");
    var localUser = localStorage.getItem("UserArray");
    if (currentAccount==null || localUser.indexOf(currentAccount) == -1) {
        let i;
    }
    else {
        alert("You already login");
        window.location = "order.html";
    }
}
checklogin();

addEventListener("keypress",check_key_press);
document.getElementById("signupbtn").addEventListener("click", alertDataUser);