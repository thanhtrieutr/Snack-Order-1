import {emailCheck} from '../../helpers/utils/validate.input';
import {createUser} from '../../helpers/api/admin-api/create-user.api';

function generatePassword() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (var i = 0; i < 8; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export function changeEmail(dataFormInput) {
  this.setState({
    email: dataFormInput
  })
}

export function validateEmail() {
  if (emailCheck(this.state.email)) {
    let password = generatePassword();

    createUser(this.state.email, password, result => {
      if (result === 200) {
        this.setState({
          status: 'is-success',
          message: 'Create successfully!',
        });
      } else {
        this.setState({
          status: 'is-warning',
          message: 'Account already exists.'
        });
      }
    })
  } else {
    this.setState({
      status: 'is-danger',
      message: 'Email is invalid.'
    });
  }
}