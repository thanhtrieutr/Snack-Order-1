import React from 'react';
import Guide from '../../../components/panel/Panel';
import InputField from '../../../components/inputField/InputField';
import { Col, Button } from 'react-bootstrap';
import {productNameCheck} from '../../../helpers/utils/validate.input';
import {checkProductName} from './../../../helpers/api/adminApi/check-product-name.api';

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
      step: 1
    }
    this.changeProductName = this.changeProductName.bind(this);
    this.validateProductName = this.validateProductName.bind(this);
  }

  render () {
    return (
      <Col xs={12}>
        <Guide bsStyle='info' title={headText} content={guideText}></Guide>
        <InputField 
          label="Product Name" type="text" 
          placeholder="* Enter product name here" 
          bsSize="large" labelSize={3} inputSize={9}
          value={this.state.productName}
          changeText={this.changeProductName} 
          validationState={this.state.status} 
          validationText={this.state.message}
          />
        <div className="fp-buttons"  style = {{display: this.state.step === 2 ? 'block' : 'none'}}>
          <Button type="button" onClick={this.addNewProduct} bsStyle="success"> Submit </Button>
        </div>

        <div className="fp-buttons"  style = {{display: this.state.step === 1 ? 'block' : 'none'}}>
          <Button type="button" onClick={this.validateProductName} bsStyle="success"> Check name </Button>
        </div>
     </Col>
    )
  }

  changeProductName(event) {
    this.setState({
      productName: event.target.value,
    })
  }

  validateProductName() {
    if (productNameCheck(this.state.productName) === false) {
      checkProductName(this.state.productName, (result) => {
        if (result === 'OK') {
          this.setState({
            status: 'success',
            message: 'Create successfully!',
            productName: '',
          });
        } else {
          this.setState({
            status: 'warning',
            message: 'Product name already exists.'
          });
        }
        console.log(result);
      })
    } else {
      this.setState({
        status: 'error',
        message: 'Product name is invalid.'
      });
    }
  }
}

export default ContentField