export function checkInput (newPassword,repeatNewPassword) {
    // Validate user's input
    if (newPassword.length < 8 || newPassword.length > 16) {
        alert("New password is too long or too short");
        return false;
    } else if (!passwordCheck(newPassword)) {
        alert("Password can only contains characters a->z,A->Z,0->9 and symbol !#$%&'*+-/=?^_`{|}");
        return false;
    } else if (repeatNewPassword != newPassword) {
        alert("New password and repeat password are not match");
        return false;
    }
    return true;
}

function passwordCheck(password) {
    return /^[[a-zA-Z0-9!#$%&'*+-/=?^_`{|}]+$/.test(password);
  }
