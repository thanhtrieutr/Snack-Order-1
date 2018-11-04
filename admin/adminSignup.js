function loadSignupForm() {
    var choiceList = document.getElementsByClassName("choice");
    for (var i = 0; i < choiceList.length; i++) {
        choiceList[i].className = choiceList[i].className.replace(" is-active", "");
    }

    var currentChoice = document.getElementById("add-user");
    currentChoice.className = currentChoice.className + " is-active";
    removeAll();

    var inputField = inputUserField();
    document.getElementById("create-user").appendChild(inputField);
}

function inputUserField() {
    var userField = document.createElement('div');
    userField.setAttribute("id", "user-field");
    userField.innerHTML =
    `<div class="field is-horizontal">
        <div class="field-label is-medium">
            <label class="label">Username</label>
        </div>
        <div class="field-body">
            <div class="field">
                <div id = "input-field" class="control">
                    <input id="username" class="input" type="text" placeholder="*Enter email (8-100 characters)" onkeypress="checkKeyPress(event)" required>
                </div> 
            </div>
        </div>
    </div>
    <div class"form-validate"></div>
    <a id="submit-name-button" class="button is-info is-hovered" onclick="alertDataUser()" >Submit</a>
    `
    return userField;
}

function signupInSever(user, password, callback) {
    var account = createNewAccount(user, password);
    var http = new XMLHttpRequest();
    http.open('POST', "http://127.0.0.1:3000/admin-controller/create-user", true);
    http.send(JSON.stringify(account));
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = this.response;
            if (callback) return callback(result);
        }
        if (this.readyState == 4 && this.status != 200) {
            alertError(this.response);
        }
    }
}

function alertDataUser() {
    var user = document.getElementById("username").value;
    var password = "12345678";

    //check validation
    if (user.length < 6 || user.length > 100) {
        alert("Username is too long or too short");
        return;
    } else if (!emailCheck(user)) {
        alert("Email is not valid and must only contains contains characters a->z,A->Z,0->9");
        return;
    }

    signupInSever(user, password, result => {
        if (result == "create succeed") {
            alert("Create successful");
        } else alert(result);
    });
}

function emailCheck(user) {
    return /^[a-zA-Z0-9_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(user);
}

function checkKeyPress(event) {
    if (event.keyCode == 13) {
        alertDataUser();
    }
}