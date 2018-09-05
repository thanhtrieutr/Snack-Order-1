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
    var repeatPassword = document.getElementById("inputRepeatPassword").value;

    //check validation
    if (User.length < 6 || User.length > 100){
        alert("Username is too long or too short");
        return;
    }
    else if (!emailCheck(User)){
        alert("Email is not valid and must only contains contains characters a->z,A->Z,0->9");
        return;
    }
    if (Password.length < 8 || Password.length > 16){
        alert("Password is too long or too short");
        return;
    }
    else if (!passwordCheck(Password)){
        alert("Password can only contains characters a->z,A->Z,0->9 and symbol !#$%&'*+-/=?^_`{|}");
        return;
    }
    if (repeatPassword != Password){
        alert("Password and repeat password are not match");
        return;
    }
    //get from storage
    var localAccount;
    localAccount = JSON.parse(localStorage.getItem("accountArray"));
    if (localAccount == null){
        localAccount = [];
    }

    //check exist
    if (findUserPos(localAccount, User) == -1){

        //change
        var newAccount = createNewAccount(User, Password);
        localAccount.push(newAccount);
        localStorage.setItem("accountArray", JSON.stringify(localAccount));

        //flag current account
        localStorage.setItem("currentAccount", User);

        // redirect
        alert("signup success");
        window.location = "order.html";
    }
    else {
        alert("User conflict");
    }
    
}

 function emailCheck(user){
    return /^[a-zA-Z0-9_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(user);
 }
 function passwordCheck(password){
    return /^[[a-zA-Z0-9!#$%&'*+-/=?^_`{|}]+$/.test(password);
}
function checkKeyPress(key){
    var keycode = key.keyCode;
    if (keycode == 13) alertDataUser();
}

function checkLogin(){
    var currentAccount = localStorage.getItem("currentAccount");
    var localAccount = JSON.parse(localStorage.getItem("accountArray"));
    if (currentAccount != null && findUserPos(localAccount, currentAccount) != -1) {
        alert("You already login");
        window.location = "order.html";
    }
}
checkLogin();

addEventListener("keypress",checkKeyPress);
document.getElementById("signupbtn").addEventListener("click", alertDataUser);

//UNIT TEST
let passText = 'background: #222; color: #61B97F';
let failText = 'background: #222; color: #E42A1B';

//unit test for email_check:
function testEmailCheck(description, expectation, func) {
    if(func == expectation) {
      console.log(`%cPass: ${description}`, passText)
    } else {
      console.log(`%cFail: actual: ${func}, expectation: ${expectation}`, failText)
    }
}
testEmailCheck("Email must only contain characters a->z,A->Z,0->9", true, emailCheck("aaa@aaa.aaa"));
testEmailCheck("Email must only contain characters a->z,A->Z,0->9", true, emailCheck("dylan00433@gmail.com"));
testEmailCheck("Email must only contain characters a->z,A->Z,0->9", true, emailCheck("aaaaaaa"));

//unit test for password_check:
function testPasswordCheck(expect, funcCheck) {
    var descript = "Password can only contains characters a->z,A->Z,0->9 and symbol !#$%&'*+-/=?^_`{|}";
    if(funcCheck == expect) {
        console.log(`%cPass: ${descript}`, passText)
      } else {
        console.log(`%cFail: actual: ${funcCheck}, expect: ${expect}`, failText)
      }
}
testPasswordCheck(true,passwordCheck("akkajskajaaaa"));
testPasswordCheck(true,passwordCheck("akkaj   skajaaaa"));
testPasswordCheck(true,passwordCheck("akkajsk###!!!!!!!ajaaaa"))
