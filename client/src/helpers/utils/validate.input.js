export function emailCheck(user) {
  if (user.length < 6 || user.length > 100) {
    return false;
  }
  return /^[a-zA-Z0-9_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(user);
}

export function tokenCheck(token) {
  if (token.length !== 6) {
    return false;
  }
  return /[A-Z\s]+/.test(token);
}

export function passwordCheck(password) {
  if (password.length < 8 || password.length > 16) {
    return false;
  }
  return /^[[a-zA-Z0-9!#$%&'*+-/=?^_`{|}]+$/.test(password);
}