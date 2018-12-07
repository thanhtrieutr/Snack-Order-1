import React from 'react';
import Input          from '../../../../components/input/Input';
import Button           from '../../../../components/button/Button';
import InputField           from '../../../../components/inputField/InputField';
import ContentField           from '../ContentField';
import StatusField          from '../../../../components/statusField/StatusField';
import { changePass, changeCfmPass, changeCode, changeEmail } from '../changeText';
import { checkValue }         from '../changeValue';

import './container.scss'

export default class Container extends React.Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      email: '',
      code: '',
      password: '',
      confirmPassword: '',
      oldPassword: '',
      updateStat: 'none',
      message: 'none',
      linking: '',
      token: '',
    }
    this.checkValue = checkValue.bind(this);
    this.changeEmail = changeEmail.bind(this);
    this.changeCode = changeCode.bind(this);
    this.changePass = changePass.bind(this);
    this.changeCfmPass = changeCfmPass.bind(this);
  }
  render () {
    return (
      <div className="forget-container cl-xs-12 cl-md-8 offset-md-2 cl-lg-6 offset-lg-3">
        <ContentField stat={this.state.step}/>
        { this.state.step === 1 ? 
          <Input changeText={this.changeEmail} className="forget-input" value={this.state.email}
            type="text" placeholder="* Enter your email here"/> : null }

        { this.state.step === 2 ? 
          <Input changeText={this.changeCode} className="forget-input" value={this.state.code}
            type="text" placeholder="* Enter your code here" /> : null }

        { this.state.step === 3 ? 
          <div>
            <InputField label="New Password" className="forget-input" changeText={this.changePass} value={this.state.password} 
                  type="password"/>
            <InputField label="Confirm Password" className="forget-input" changeText={this.changeCfmPass} value={this.state.confirmPassword} 
                  type="password"/>
          </div> : null }

        { this.state.updateStat !== 'none' ?
          <StatusField href={this.state.linking} stat={this.state.updateStat} content={this.state.message}/> : null }

        { this.state.step !== 4 ? 
          <div className="forget-button-container">
            <Button label="Submit" onClick={this.checkValue} className="forget-button"/>
            <Button label="Cancel" href="/" className="forget-button"/>
          </div> : null }
      </div>
    )
  }
}
