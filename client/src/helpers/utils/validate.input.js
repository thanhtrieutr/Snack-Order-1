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

export function priceCheck(price) {
  if (price.length > 5) {
    return false;
  }
  return /^[0-9]+$/.test(price);
}

export function imageSizeCheck(size) {
  if (size > 100000) {
    return false;
  }
  return true;
}

export function productNameCheck(productName) {
  if (productName === "" || productName === null || productName.length > 40) {
    return true;
  } 
  return /[!@#$%^&*_+\-=\[\]{};':"\\|,.<>\/?]/.test(productName);
}