import React, { Component } from 'react';
import InputField from '../../../components/InputField';
import Notification from '../../../components/Notification';
import Button from '../../../components/Button';
import Header from './Header';
import { emailCheck } from '../../../helpers/utils/validate.input';
import { createUser } from '../../../helpers/api/admin-api/create-user.api';

const guide = <ul><li>* Email must have more than 6 characters</li>
                  <li>* Special characters is not allowed</li></ul>
 
class ContentField extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      status: '',
      message: '',
    }
    this.changeEmail = this.changeEmail.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }
  render() {
    return (
      <div id="body" className="column is-10">
        <Header></Header>
        <Notification content={guide}></Notification>
        <InputField className="is-info" label="Email" changeText={this.changeEmail} 
          value={this.state.email} type="text"/>
        { this.state.status !== ''?
          <Notification className={this.state.status} content={this.state.message}/>
          : null }

        <Button className="is-success" label="Submit" onClick={this.validateEmail}/>
      </div>
    )
  }
  changeEmail(dataFormInput) {
    this.setState({
      email: dataFormInput
    })
  }
  validateEmail() {
    if (emailCheck(this.state.email)) {
      createUser(this.state.email, '12345678', result => {
        if (result === true) {
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
}

export default ContentField;