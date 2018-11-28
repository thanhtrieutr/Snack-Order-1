export function createNewAccount(user, password) {
  var newAccount = {};
  newAccount.user = user;
  newAccount.password = password;
  return newAccount;
}