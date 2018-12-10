import React from 'react';
import InputField from '../../../components/inputField/InputField';
import Guide from './panel/Panel';
import {changeEmail, validateEmail} from '../utils';
import { Col, Button } from 'react-bootstrap';

const guideText = <ul><li>Email must have more than 6 characters</li>
                  <li>Special characters is not allowed</li></ul>
const headText = 'Create user guide'
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
        <Guide heading={headText} content={guideText}></Guide>
        <InputField label="Email :" changeText={this.changeEmail} value={this.state.email} type="text" 
          placeholder="* Enter email here"/>

        <Col xs={4} xsOffset={5} sm={1} smOffset={6}>
          <Button type="button" onClick={this.checkValue} bsStyle="primary"> Submit </Button>
        </Col>
      </div>
    )
  }
}
