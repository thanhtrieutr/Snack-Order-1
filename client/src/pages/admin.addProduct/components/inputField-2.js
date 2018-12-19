import React from 'react'
import { Form, FormGroup, FormControl } from 'react-bootstrap'
import { Col, ControlLabel, HelpBlock } from 'react-bootstrap'

export default class InputField extends React.Component {
  render () {
    return (
      <Form horizontal>
        <FormGroup bsSize={this.props.bsSize} validationState={this.props.validationState}>
          <Col componentClass={ControlLabel} sm={this.props.labelSize}>
            {this.props.label}
          </Col>
          <Col sm={this.props.inputSize}>
            <FormControl type={this.props.type} placeholder={this.props.placeholder} value={this.props.value} 
              onChange={this.props.changeText} disabled={this.props.disabled}/>
            <HelpBlock>{this.props.validationText}</HelpBlock>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}