import React from 'react'
import InputField           from '../../../../components/inputField/InputField';
import ContentField           from '../contentField/ContentField';
import StatusField          from '../statusField/StatusField';
import { Grid, Row, Col }           from 'react-bootstrap'
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
      <Grid>
        <Row>
          <Col className="forget-container" xs={12} md={8} mdOffset={2} lg={6} lgOffset={3}>
            <ContentField stat={this.state.step}/>

            { this.state.step === 1 ?
              <InputField label="Email :" changeText={this.changeEmail} value={this.state.email} type="text" 
                placeholder="* Enter your email here"/> : null }

            { this.state.step === 2 ? 
              <InputField label="Code :" changeText={this.changeCode} value={this.state.code} type="text" 
                placeholder="* Enter your code here" /> : null }

            { this.state.step === 3 ? 
              <div>
                <InputField label="Password" changeText={this.changePass} value={this.state.password} 
                      type="password"/>
                <InputField label="Confirm Password" changeText={this.changeCfmPass} value={this.state.confirmPassword} 
                      type="password"/>
              </div> : null }

            { this.state.updateStat !== 'none' ?
              <StatusField href={this.state.linking} stat={this.state.updateStat} content={this.state.message}/> : null }

            { this.state.step !== 4 ? 
              <Col xs={6} xsOffset={3} sm={4} smOffset={4}>
                <ButtonToolbar>
                  <Button type="button" onClick={this.checkValue} bsStyle="primary"> Submit </Button>
                  <Button type="button" href="/" bsStyle="primary"> Cancel </Button>
                </ButtonToolbar> 
              </Col> : null }
          </Col>
        </Row>
      </Grid>
    )
  }
}
