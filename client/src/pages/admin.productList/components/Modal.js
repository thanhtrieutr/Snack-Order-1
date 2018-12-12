import React from 'react'
import { Modal, Button, Col, Row } from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import { updatePrice } from '../../../helpers/api/adminApi/update-price.api'
import { priceCheck } from '../../../helpers/utils/validate.input'
import InputField from '../../../components/inputField/InputField'
import InputFile from '../../../components/inputFile/InputFile'
import Star from './Star'
import Sale from './Sales'

export default class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editState: props.editState,
      status: null,
      message: '',
      newPrice: '',
    }
    this.editPrice = this.editPrice.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.changePrice = this.changePrice.bind(this);
    this.savePrice = this.savePrice.bind(this);
  }
  render() {
    return (
      <Modal show={this.props.show} bsSize={this.props.bsSize}>
        <Modal.Header>
          <Modal.Title>{this.props.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col xs={12} sm={3}>
              <Image alt="product" src={`http://127.0.0.1:3000${this.props.image}`} thumbnail responsive></Image>
              { this.state.editState === true ? <InputFile id="product-image-input-field"/> : null}
            </Col>
            <Col xs={12} sm={4}>
              <div className="admin-product-div">
                Description:
              </div>
              <div className="admin-product-div">
                <Star/>
              </div>
              <div className="admin-product-div">
                Units in Stock: 10
              </div>
              <div className="admin-product-div">
                Shop: 
              </div>
              <div className="admin-product-div">
                Company: 
              </div>
            </Col>
            <Col xs={12} sm={5}>
              <Sale/>
              <div> 
                <h3>Price</h3>

                {this.state.editState === false && this.state.status === 'success' ? 
                  <p className="admin-product-price"> {this.state.newPrice} vnđ</p> : null}

                {this.state.editState === false && this.state.status !== 'success' ? 
                  <p className="admin-product-price"> {this.props.price} vnđ</p> : null}

                {this.state.editState === true ?  
                  <InputField changeText={this.changePrice} value={this.state.newPrice} type="text" 
                  placeholder="* Enter price" bsSize="large" inputSize={12}
                  validationState={this.state.status} validationText={this.state.message}/> : null}
              </div>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
          {this.state.editState === false? 
            <Button bsStyle="primary" onClick={this.editPrice}>Edit</Button>
          : <div className="admin-button-div">
              <Button className="admin-product-button" onClick={this.cancelEdit}>Cancel</Button>
              <Button bsStyle="primary" onClick={this.savePrice}>Save</Button>
            </div>}
        </Modal.Footer>
      </Modal>
    )
  }
  editPrice() {
    this.setState({
      status: null,
      message: '',
      editState: true,
      buttonState: 'Save',
    });
  }
  cancelEdit() {
    this.setState({
      status: null,
      message: '',
      editState: false,
    })
  }
  savePrice() {
    if (priceCheck(this.state.newPrice)) {
      updatePrice(this.props.id, this.state.newPrice, (result) => {
        if (result.success === true) {
          this.setState({
            editState: false,
            status: 'success',
            message: 'Edit successfully!'
          })
        } else {
          this.setState({
            status: 'warning',
            message: 'Edit failed.'
          })
        }
      })
    } else {
      this.setState({
        status: 'error',
        message: 'Input is invaild.'
      })
    }  
  }
  changePrice(evt) {
    this.setState({
      newPrice: evt.target.value,
    });
  }
}