export function checkInput (newPassword,repeatNewPassword) {
    // Validate user's input
    if (newPassword.length < 8 || newPassword.length > 16) {
        return 0;
    } else if (!passwordCheck(newPassword)) {
        return 1;
    } else if (repeatNewPassword !== newPassword) {
        return 2;
    }
    return 4;
}

function passwordCheck(password) {
    return /^[[a-zA-Z0-9!#$%&'*+-/=?^_`{|}]+$/.test(password);
  }
