function signupInSever(user, password, callback) {
    var account = createNewAccount(user, password);
    var http = new XMLHttpRequest();
    http.open('POST', "http://127.0.0.1:3000/createUser", true);
    http.send(JSON.stringify(account));
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var result = this.response;
            if (callback) return callback(result);
        }
    }
}

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
    
    signupInSever(user, password, result => {
        if (result == "create succeed") {
            alert("Signup successful");
            window.location.href = "/login";
        }
        else alert(result);
    });
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


