function passwordCheck(password) {
  return /^[[a-zA-Z0-9!#$%&'*+-/=?^_`{|}]+$/.test(password);
}

function changeUserPassword(oldPassword, newPassword, token, callback) {
  var changePassword = changePasswordUser(oldPassword, newPassword, token);
  var http = new XMLHttpRequest();
  http.open('POST', "http://127.0.0.1:3000/updatePassword", true);
  http.send(JSON.stringify(changePassword));
  http.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {       
        var result = this.response;
        if (callback) return callback(result);
      }
  }
}

function changePasswordValidation () {
  var oldPassword = getById("current-password").value;
  var newPassword = getById("new-password").value;
  var repeatNewPassword = getById("repeat-new-password").value;
  var token = localStorage.getItem("token");
  //  Check user's input
  if (newPassword.length < 8 || newPassword.length > 16) {
      alert("New password is too long or too short");
      return;
  } else if (!passwordCheck(newPassword)) {
      alert("Password can only contains characters a->z,A->Z,0->9 and symbol !#$%&'*+-/=?^_`{|}");
      return;
  } else if (newPassword != repeatNewPassword) {
      alert("New password and repeat new password are not match");
      return;
  }
  changeUserPassword(oldPassword, newPassword, token, result => {
      if (result == "Update Success") {
          alert("Change successful");
      }
      else alert(result);
  });
//  alert("Ping");
}



document.getElementById("change-pass-button").addEventListener("click", changePasswordValidation);