import React from 'react';
import Guide from '../../../components/panel/Panel';
import InputField from '../../../components/inputField/InputField';
import NavBarAdmin from '../../../components/NavBarAdmin/NavBarAdmin'
import { Col, Button } from 'react-bootstrap';
import { changeEmail, validateEmail } from '../utils';

const headText = 'Create user guide'
const guideText =  
    <ul>
      <li>Email must have more than 6 characters</li>
      <li>Special characters is not allowed</li>
      <li>Password will generate randomly</li>
    </ul>

export default class ContentField extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      status: null,
      message: '',
    }
    this.changeEmail = changeEmail.bind(this);
    this.validateEmail = validateEmail.bind(this);
  }
  render() {
    return (
      <Col xs={12} md={9} lg={10}>
				<NavBarAdmin activeMenuItem="add-user"></NavBarAdmin>
        <Guide bsStyle='info' title={headText} content={guideText}></Guide>

        <InputField label="Email" changeText={this.changeEmail} value={this.state.email} type="text" 
          placeholder="* Enter email here" bsSize="large" labelSize={2} inputSize={10}
          validationState={this.state.status} validationText={this.state.message}/>

        <div className="fp-buttons">
          <Button type="button" onClick={this.validateEmail} bsStyle="success"> Submit </Button>
        </div>
      </Col>
    )
  }
}
