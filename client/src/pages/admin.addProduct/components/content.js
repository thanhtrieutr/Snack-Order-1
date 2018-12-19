import React from 'react';
import Guide from '../../../components/panel/Panel';
import InputField1 from './inputField-1';
import InputField2 from './inputField-2';
import InputField3 from '././inputField-3'
import { Col, Button } from 'react-bootstrap';
import {productNameCheck, priceCheck, imageSizeCheck} from '../../../helpers/utils/validate.input';
import {checkProductName, uploadNewProduct} from '../../../helpers/api/adminApi/create-product.api';

const headText = 'Create product guide'
const guideText =  
    <ul>
      <li>Product name must have no more than 40 characters</li>
      <li>Product price must have no more than 5 numbers</li>
      <li>Special characters is not allowed</li>
      <li>Image upload must have no more than 100kb </li>
      <li>All information must be filled before upload</li>
    </ul>

class ContentField extends React.Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      productName: '',
      productPrice: '',
      productImage: null,
      status_1: null,
      status_2: null,
      status_3: null,
      message_1: '',
      message_2: '',
      message_3: '',
      message_4: '',
      disabledField_1: true,
      disabledField_2: true,
      disabledField_3: true,
      successful: null
    }
    this.changeProductName = this.changeProductName.bind(this);
    this.changeProductPrice = this.changeProductPrice.bind(this);
    this.changeProductImage = this.changeProductImage.bind(this);

    this.validateProductName = this.validateProductName.bind(this);
    this.validateProductPrice = this.validateProductPrice.bind(this);

    this.uploadNewProduct  = this.uploadNewProduct.bind(this);
  }

  render () {
    return (
      <Col xs={12}>
        <Guide bsStyle='info' title={headText} content={guideText}></Guide>
        <InputField1 
          label="Product Name" type="text" 
          placeholder="* Enter product name here" 
          bsSize="large" labelSize={3} inputSize={9}
          value={this.state.productName}
          changeText={this.changeProductName} 
          validationState={this.state.status_1} 
          validationText={this.state.message_1}
          disabled = {this.state.step === 2 ? this.state.disabledField_1 : (this.state.step === 3 ? this.state.disabledField_1 : false)}
          />
        <InputField2
          label="Product Price" type="text" 
          placeholder="* Enter product price here" 
          bsSize="large" labelSize={3} inputSize={9}
          value={this.state.productPrice}
          changeText={this.changeProductPrice} 
          validationState={this.state.status_2} 
          validationText={this.state.message_2}
          disabled = {this.state.step === 1 ? this.state.disabledField_2 : (this.state.step === 3 ? this.state.disabledField_2 : false)}
          />
          <InputField3
          label="Product Image"
          bsSize="large" labelSize={3} inputSize={9}
          changeText={this.changeProductImage} 
          validationState={this.state.status_3} 
          validationText={this.state.successful === true ? this.state.message_4 : this.state.message_3}
          disabled = {this.state.step === 1 ? this.state.disabledField_3 : (this.state.step === 2 ? this.state.disabledField_3 : false)}
          />

        <div className="fp-buttons"  style = {{display: this.state.step === 1 ? 'block' : 'none'}}>
          <Button type="button" onClick={this.validateProductName} bsStyle="success"> Check name </Button>
        </div>

        <div className="fp-buttons"  style = {{display: this.state.step === 2 ? 'block' : 'none'}}>
          <Button type="button" onClick={this.validateProductPrice} bsStyle="success"> Check price </Button>
        </div>

        <div className="fp-buttons"  style = {{display: this.state.step === 3 || this.state.step === 4 ? 'block' : 'none'}}>
          <Button type="button" onClick={this.uploadNewProduct}
          disabled = {this.state.step === 4 ? false : true}  bsStyle="success"> Submit </Button>
        </div>
     </Col>
    )
  }

  changeProductName(event) {
    this.setState({
      productName: event.target.value,
    })
  }

  changeProductPrice(event) {
    this.setState({
      productPrice: event.target.value,
    })
  }

  changeProductImage(event) {
    if (imageSizeCheck(event.target.files[0].size) === true) {
      this.setState({
        productImage: event.target.files[0],
        status_3: 'success',
        message_3: 'Upload image successful',
        step: 4
      })
    } else {
      this.setState({
        status_3: 'error',
        message_3 : 'The uploaded image is too large. Maximum size allowed is 97KB'
      });
    }
  }

  validateProductName() {
    if (productNameCheck(this.state.productName) === false) {
      checkProductName(this.state.productName, result => {
        if (result==='OK') {
          this.setState({
            status_1: 'success',
            message_1: 'Product name can be used',
            step: 2
          });
        } else {
          this.setState({
            status_1: 'warning',
            message_1: 'Product name already exists.'
          });
        }
      })
    } else {
      this.setState({
        status_1: 'error',
        message_1: 'Product name is invalid.'
      });
    }
  }

  validateProductPrice() {
    if (priceCheck(this.state.productPrice) === true) {
      this.setState({
        status_2: 'success',
        message_2: 'Product price is valid',
        step: 3
      })
    } else {
      this.setState({
        status_2: 'error',
        message_2: 'Product price is invalid.'
      });
    }
  }

  uploadNewProduct() {
    uploadNewProduct(this.state.productName, this.state.productPrice, this.state.productImage, (result) => {
      if (result === true) {
        this.setState({
          message_1: '',
          message_2: '',
          message_3: '',
          message_4: 'Create new product successful',
          successful: true
        })
      }
    })
  }
}

export default ContentField