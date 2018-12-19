import React from 'react';
import Guide from '../../../components/panel/Panel';
import InputField from '../../../components/inputField/InputField';
import { Col, Button } from 'react-bootstrap';

const headText = 'Create product guide'
const guideText =  
    <ul>
      <li>Product name must have no more than 40 characters</li>
      <li>Special characters is not allowed</li>
      <li>Image upload must have no more than 100kb </li>
      <li>All information must be filled before upload</li>
    </ul>

class ContentField extends React.Component {
  constructor() {
    super();
    this.state = {
      productName: '',
      status: null,
      message: '',
    }
    // this.changeProductName = this.changeProductName.bind(this);
    // this.validateProductName = this.validateProductName.bind(this);
  }

  render () {
    return (
      <Col xs={12}>
        <Guide bsStyle='info' title={headText} content={guideText}></Guide>
        <InputField 
          label="Product Name" type="text" 
          placeholder="* Enter product name here" 
          bsSize="large" labelSize={3} inputSize={9}
          // changeText={this.changeProductName} 
          // value={this.state.productName} 
          // validationState={this.state.status} 
          // validationText={this.state.message}
          />

        <div className="fp-buttons">
          <Button type="button" onClick={this.validateProductName} bsStyle="success"> Submit </Button>
        </div>
     </Col>
    )
  }
}

export default ContentField