import React from 'react';
import InputField from '../../../components/inputField/InputField';
import Notification from '../../../components/notification/Notification';
import Button from '../../../components/button/Button';
import Header from './Header';
import {changeEmail, validateEmail} from '../utils';

const guide = <ul><li>* Email must have more than 6 characters</li>
                  <li>* Special characters is not allowed</li></ul>
 
export default class ContentField extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      status: '',
      message: '',
    }
    this.changeEmail = changeEmail.bind(this);
    this.validateEmail = validateEmail.bind(this);
  }
  render() {
    return (
      <div id="body">
        <Header></Header>
        <Notification content={guide}></Notification>
        <InputField className="input is-info" label="Email" changeText={this.changeEmail} 
          value={this.state.email} type="text"/>
        { this.state.status !== ''?
          <Notification className={this.state.status} content={this.state.message}/>
          : null }
        <div className="buttons is-centered">
          <Button className="button is-success" label="Submit" onClick={this.validateEmail}/>
        </div>
      </div>
    )
  }
}
