import React from 'react';
import { Form, FormGroup, FormControl } from 'react-bootstrap'
import { Col, ControlLabel } from 'react-bootstrap'
// import Input from '../input/Input';

export default class InputField extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     inputValue: '',
  //   }
  //   this.returnValue = this.returnValue.bind(this);
  //   this.changeText = this.changeText.bind(this);
  // }
  render () {
    return (
      <Form horizontal>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            {this.props.label}
          </Col>
          <Col sm={10}>
            <FormControl type={this.props.type} placeholder={this.props.placeholder} value={this.props.value} 
              onChange={this.props.changeText} />
          </Col>
        </FormGroup>
      </Form>
    )
  }
  // changeText(evt) {
  //   this.setState({ inputValue: evt.target.value }, () => {
  //     this.returnValue();
  //   })
  // }
  // returnValue = () => {
  //   var editText = this.state.inputValue;
  //   this.props.changeText(editText);
  // }
}
