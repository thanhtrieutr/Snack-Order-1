import {emailCheck} from '../../helpers/utils/validate.input';
import {createUser} from '../../helpers/api/adminApi/create-user.api';

function generatePassword() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (var i = 0; i < 8; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export function changeEmail(evt) {
  this.setState({
    email: evt.target.value,
  })
}

export function validateEmail() {
  if (emailCheck(this.state.email)) {
    let password = generatePassword();

    createUser(this.state.email, password, (result) => {
      if (result.success === true) {
        this.setState({
          status: 'success',
          message: 'Create successfully!',
          email: '',
        });
      } else {
        this.setState({
          status: 'warning',
          message: 'Account already exists.'
        });
      }
    })
  } else {
    this.setState({
      status: 'error',
      message: 'Email is invalid.'
    });
  }
}