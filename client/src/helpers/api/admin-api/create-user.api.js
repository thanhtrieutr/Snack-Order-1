import { createNewAccount } from '../../utils/create.user';

export function createUser(email, password, callback) {
  let account = createNewAccount(email, password);
  let token = localStorage.getItem('token');
  let object = {
    token: token,
    account: account
  };
  fetch('http://127.0.0.1:3000/admin-controller/create-user', {
    method: 'POST',
    body: JSON.stringify(object)
  }).then(response => {
    if (response.status === 200) {
      callback(true);
    } else {
      callback(false);
    }
  });
}
