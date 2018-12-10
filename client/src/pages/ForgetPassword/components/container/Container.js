import React from 'react'
import InputField           from '../../../../components/inputField/InputField';
import ContentField           from '../contentField/ContentField';
import { Grid, Col, Alert }           from 'react-bootstrap'
import { Button, ButtonToolbar }          from 'react-bootstrap'
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
      updateStat: null,
      message: '',
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
      <Grid>
        <Col className="fp-container" xs={12} md={8} mdOffset={2} lg={6} lgOffset={3}>
          <ContentField stat={this.state.step}/>

          { this.state.step === 1 ?
            <InputField label="Email" changeText={this.changeEmail} value={this.state.email} type="text" 
              placeholder="* Enter your email here" bsSize="large" labelSize={2} inputSize={10}
              validationState={this.state.updateStat} validationText={this.state.message}/> : null }

          { this.state.step === 2 ? 
            <InputField label="Code" changeText={this.changeCode} value={this.state.code} type="text" 
              placeholder="* Enter your code here" bsSize="large" labelSize={2} inputSize={10}
              validationState={this.state.updateStat} validationText={this.state.message}/> : null }

          { this.state.step === 3 ? 
            <div>
              <InputField label="Password" changeText={this.changePass} value={this.state.password} 
                type="password" labelSize={4} inputSize={8} validationState={this.state.updateStat} 
                validationText={this.state.message}/>
              <InputField label="Confirm Password" changeText={this.changeCfmPass} value={this.state.confirmPassword} 
                type="password" labelSize={4} inputSize={8} validationState={this.state.updateStat} 
                validationText={this.state.message}/>
            </div> : null }
          
          { this.state.updateStat === 'success' ?
            <Alert bsStyle="success">
              <strong>{this.state.message}</strong>
              <a href="/login">Return to login</a>
            </Alert> : null }

          { this.state.step !== 4 ? 
            <Col className="fp-buttons">
              <ButtonToolbar>
                <Button type="button" onClick={this.checkValue} bsStyle="success"> Submit </Button>
                <Button type="button" href="/login" bsStyle="success"> Cancel </Button>
              </ButtonToolbar> 
            </Col> : null }
        </Col>
      </Grid>
    )
  }
}
