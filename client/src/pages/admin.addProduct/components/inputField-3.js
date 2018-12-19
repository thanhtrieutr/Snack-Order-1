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
            <FormControl type="file" id="product-add-input"
              onChange={this.props.changeText} disabled={this.props.disabled}/>
            <HelpBlock>{this.props.validationText}</HelpBlock>
          </Col>
        </FormGroup>

      </Form>
    )
  }
}