import React, { Component } from 'react';
import Input from '../../../../components/input/Input';
import Button from '../../../../components/button/Button';
import InputField from '../../../../components/input-field/InputField';
import ContentField from '../ContentField';
import StatusField from '../../../../components/status-field/StatusField';
import { emailCheck, passwordCheck, tokenCheck } from '../../../../helpers/utils/validate.input';
import { checkValidUser } from '../../../../helpers/api/user-api/getUser';
import './container.css'
import '../../../../components/responsvie-design/build-column.css'
import '../../../../components/responsvie-design/off-set.css'

class Container extends Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      email: '',
      code: '',
      password: '',
      confirmPassword: '',
      updateStat: 'none',
      message: 'none',
      linking: '',
    }
    this.checkValue = this.checkValue.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changeCode = this.changeCode.bind(this);
    this.changePass = this.changePass.bind(this);
    this.changeCfmPass = this.changeCfmPass.bind(this);
  }
  render () {
    return (
      <div className="forget-container cl-xs-12 cl-md-8 offset-md-2 cl-lg-6 offset-lg-3">
        <ContentField stat={this.state.step}/>
        { this.state.step === 1 ? 
          <Input changeText={this.changeEmail} value={this.state.email}
            type="text" placeholder="* Enter your email here"/> : null }

        { this.state.step === 2 ? 
          <Input changeText={this.changeCode} value={this.state.code}
            type="text" placeholder="* Enter your code here" /> : null }

        { this.state.step === 3 ? 
          <div>
            <InputField label="New Password" changeText={this.changePass} value={this.state.password} 
                  type="password"/>
            <InputField label="Confirm Password" changeText={this.changeCfmPass} value={this.state.confirmPassword} 
                  type="password"/>
          </div> : null }

        { this.state.updateStat !== 'none' ?
          <StatusField href={this.state.linking} stat={this.state.updateStat} content={this.state.message}/> : null }

        { this.state.step !== 4 ? 
          <div className="forget-button-container">
            <Button label="Submit" onClick={this.checkValue}/>
            <Button label="Cancel" href="/"/>
          </div> : null }
      </div>
    )
  }
  changeEmail(evt) {
    this.setState({
      email: evt.target.value,
    })
  }
  changeCode(evt) {
    this.setState({
      code: evt.target.value,
    })
  }
  changePass(dataFromInput) {
    this.setState({
      password: dataFromInput, 
    })
  }
  changeCfmPass(dataFromInput) {
    this.setState({
      confirmPassword: dataFromInput,
    })
  }
  checkValue(){
    switch (this.state.step) {
    case 1:
      if (emailCheck(this.state.email)) {
        checkValidUser(this.state.email, (result) => {
          if (result.success === true) {
            this.setState({
              step : 2,
              updateStat: 'none',
              message: 'none',
            });
          } else {
            this.setState({
              updateStat : 'ms_warning',
              message: 'User does not exist'
            })
          }
        });
      }
      else if (this.state.email.length === 0) {
        this.setState({ 
          updateStat : 'ms_error',
          message: "Can't be blank",
        });
      }
      else {
        this.setState({ 
          updateStat : 'ms_error',
          message: "Email is invalid",
        });
      }
      break;
    case 2:
      if (tokenCheck(this.state.code)) {
        this.setState({
          step : 3,
          updateStat: 'none',
          message: 'none',
        });
      }
      else if (this.state.code.length === 0) {
        this.setState({ 
          updateStat : 'ms_error',
          message: "Can't be blank",
        });
      }
      else {
        this.setState({ 
          updateStat : 'ms_error',
          message: "Code in invalid",
        });
      }
      break;
    case 3:
      if (passwordCheck(this.state.password)) {
        if (this.state.password === this.state.confirmPassword) {
          this.setState({step : 4}, () => {
            this.setState({
              updateStat: 'ms_success',
              message: "Reset password successfully! ",
              linking: '/login'
            });
          });
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
}

export default Container;