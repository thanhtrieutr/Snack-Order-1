import {emailCheck, passwordCheck, tokenCheck} from '../../../helpers/utils/validate.input';
import {checkValidUser, validateCode, updatePassword} from '../../../helpers/api/userApi/getUser';

export function checkValue() {
  switch (this.state.step) {
    case 1:
      if (emailCheck(this.state.email)) {
        checkValidUser(this.state.email, (result) => {
          if (result.success === true) {
            this.setState({
              step: 2,
              updateStat: 'none',
              message: 'none',
            });
          } else {
            this.setState({
              updateStat: 'ms_warning',
              message: 'User does not exist'
            })
          }
        });
      } else if (this.state.email.length === 0) {
        this.setState({
          updateStat: 'ms_error',
          message: "Can't be blank",
        });
      } else {
        this.setState({
          updateStat: 'ms_error',
          message: "Email is invalid",
        });
      }
      break;
    case 2:
      if (tokenCheck(this.state.code)) {
        validateCode(this.state.email, this.state.code, (result) => {
          if (result.success === true) {
            this.setState({
              step: 3,
              updateStat: 'none',
              message: 'none',
              token: result.token,
              oldPassword: result.password,
            });
          } else {
            this.setState({
              updateStat: 'ms_warning',
              message: 'Code does not match'
            });
          }
        })

      } else if (this.state.code.length === 0) {
        this.setState({
          updateStat: 'ms_error',
          message: "Can't be blank",
        });
      } else {
        this.setState({
          updateStat: 'ms_error',
          message: "Code in invalid",
        });
      }
      break;
    case 3:
      if (passwordCheck(this.state.password)) {
        if (this.state.password === this.state.confirmPassword) {
          updatePassword(this.state.oldPassword, this.state.password, this.state.token, (result) => {
            if (result.success === true) {
              this.setState({
                step: 4
              }, () => {
                this.setState({
                  updateStat: 'ms_success',
                  message: "Reset password successfully! ",
                  linking: '/login',
                  token: ''
                });
              });
            } else {
              this.setState({
                updateStat: 'ms_warning',
                message: "Reset failed"
              });
            }
          })
        } else {
          this.setState({
            updateStat: 'ms_error',
            message: "Password and confirm password doesn't match",
          });
        }
      } else {
        this.setState({
          updateStat: 'ms_error',
          message: "Password is invalid",
        });
      }
      break;
    default:
      break;
  }
}