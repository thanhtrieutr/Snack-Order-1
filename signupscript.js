function alertDataUser() {
    var user = getById("input-user").value;
    var password = getById("input-password").value;
    var repeatPassword = getById("input-repeat-password").value;

    //check validation
    if (user.length < 6 || user.length > 100) {
        alert("Username is too long or too short");
        return;
    }
    else if (!emailCheck(user)) {
        alert("Email is not valid and must only contains contains characters a->z,A->Z,0->9");
        return;
    }
    if (password.length < 8 || password.length > 16) {
        alert("Password is too long or too short");
        return;
    }
    else if (!passwordCheck(password)) {
        alert("Password can only contains characters a->z,A->Z,0->9 and symbol !#$%&'*+-/=?^_`{|}");
        return;
    }
    if (repeatPassword != password) {
        alert("Password and repeat password are not match");
        return;
    }
    //get from storage
    var localAccount;
    localAccount = JSON.parse(localStorage.getItem("accountArray"));
    if (localAccount == null) {
        localAccount = [];
    }

    //check exist
    if (findUserPosition(localAccount, user) == -1) {

        //change
        var newAccount = createNewAccount(user, password);
        localAccount.push(newAccount);
        localStorage.setItem("accountArray", JSON.stringify(localAccount));

        //flag current account
        localStorage.setItem("currentAccount", user);

        // redirect
        alert("signup success");
        window.location = "order.html";
    }
    else {
        alert("User conflict");
    }
    
}

function emailCheck(user) {
    return /^[a-zA-Z0-9_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(user);
}
function passwordCheck(password) {
    return /^[[a-zA-Z0-9!#$%&'*+-/=?^_`{|}]+$/.test(password);
}
function checkKeyPress(key) {
    if (key.keyCode == 13) {
        alertDataUser();
    }
}

checkLogInAlready();

addEventListener("keypress", checkKeyPress);
getById("sign-up-button").addEventListener("click", alertDataUser);

//UNIT TEST
let passText = 'background: #222; color: #61B97F';
let failText = 'background: #222; color: #E42A1B';

// check email character
function emailCheck(user) {
    return /^[a-zA-Z0-9_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(user)
}

// unit test for email_check:

//unit test for email_check:


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

//check password character
function passwordCheck(password) {
    return /^[[a-zA-Z0-9!#$%&'*+-/=?^_`{|}]+$/.test(password);
}

//unit test for password_check:
function testPasswordCheck(expect, funcCheck) {
    var descript = "Password can only contains characters a->z,A->Z,0->9 and symbol !#$%&'*+-/=?^_`{|}";
    if(funcCheck == expect) {
        console.log(`%cPass: ${descript}`, passText)
      } else {
        console.log(`%cFail: actual: ${funcCheck}, expect: ${expect}`, failText)
      }
}
testPasswordCheck(true, passwordCheck("akkajskajaaaa"));
testPasswordCheck(true, passwordCheck("akkaj   skajaaaa"));
testPasswordCheck(true, passwordCheck("akkajsk###!!!!!!!ajaaaa"))
