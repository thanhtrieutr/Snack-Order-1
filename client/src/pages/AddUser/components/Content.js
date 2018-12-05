import React from 'react';
import InputField from '../../../components/inputField/InputField';
import Notification from '../../../components/notification/Notification';
import Button from '../../../components/button/Button';
import Header from './Header';
import {changeEmail, validateEmail} from '../utils';
// import {loadProduct} from '../../../helpers/api/admin-api/get-product.api';
// import '../admin.css';
// import '../mystyles.css';

const guide = <ul><li>* Email must have more than 6 characters</li>
                  <li>* Special characters is not allowed</li></ul>
 
class ContentField extends React.Component {
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
}

export default ContentField;