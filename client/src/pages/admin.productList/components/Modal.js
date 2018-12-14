import React from 'react'
import { Modal, Button, Col, Row } from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import { updatePrice } from '../../../helpers/api/adminApi/update-price.api'
import { priceCheck, imageSizeCheck } from '../../../helpers/utils/validate.input'
import { uploadProductImage } from '../../../helpers/api/adminApi/upload-image.api'
import InputField from '../../../components/inputField/InputField'
import InputFile from '../../../components/inputFile/InputFile'
import Star from './Star'
import Sale from './Sales'

export default class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editState: false,
      status: null,
      message: null,
      selectedFile: null,
      newPrice: '',
    }
    this.editPrice = this.editPrice.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.changePrice = this.changePrice.bind(this);
    this.saveInfo = this.saveInfo.bind(this);
    this.handleSelectedFile = this.handleSelectedFile.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
              { this.state.editState === true ? 
                <div>
                  <InputFile id="product-image-input-field" onChange={this.handleSelectedFile}/>
                  {this.state.selectedFile !== null ? <p className="image-label">{this.state.selectedFile.name}</p> : null}
                </div> : null}
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

                {this.state.editState === false ? 
                  <p className="admin-product-price"> {this.props.price} vnđ</p> : 
                  <InputField changeText={this.changePrice} value={this.state.newPrice} type="text" 
                  placeholder="* Enter price" bsSize="large" inputSize={12}
                  validationState={this.state.status}/>}
              </div>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <p className={"admin-status " + this.state.status}>{this.state.message}</p>
          <Button onClick={this.closeModal}>Close</Button>
          {this.state.editState === false? 
            <Button bsStyle="primary" onClick={this.editPrice}>Edit</Button>
          : <div className="admin-button-div">
              <Button className="admin-product-button" onClick={this.cancelEdit}>Cancel</Button>
              <Button bsStyle="primary" onClick={this.saveInfo}>Save</Button>
            </div>}
        </Modal.Footer>
      </Modal>
    )
  }
  editPrice() {
    this.setState({
      status: null,
      message: null,
      editState: true,
      newPrice: this.props.price,
    });
  }
  cancelEdit() {
    this.setState({
      status: null,
      message: null,
      newPrice: this.props.price,
      editState: false,
      selectedFile: null,
    })
  }
  saveInfo() {
    if (priceCheck(this.state.newPrice)) {
      updatePrice(this.props.id, this.state.newPrice, (result) => {
        if (result.success === true) {
          if (this.state.selectedFile !== null) {
            this.handleUpload();
          }
          this.setState({
            editState: false,
            status: 'success',
            message: '*Edit successfully!'
          }, () => {
            this.props.changeInfo();
          });
        } else {
          this.setState({
            status: 'warning',
            message: '*Edit failed.'
          })
        }
      })
    } else {
      this.setState({
        status: 'error',
        message: '*Input is invaild.'
      })
    }  
  }
  changePrice(evt) {
    this.setState({
      newPrice: evt.target.value,
    });
  }
  handleSelectedFile(evt) {
    if (imageSizeCheck(evt.target.files[0].size)) {
      this.setState({
        selectedFile: evt.target.files[0],
        status: null,
        message: null,
      });
    } else {
      this.setState({
        message: '*The uploaded image is too large. Maximum size allowed is 97KB',
        status: 'warning'
      })
    }
  }
  handleUpload() {
    uploadProductImage(this.state.selectedFile, this.props.id, (result) => {
      if (result === true) {
        this.props.changeInfo();
      }
    });
  }
  closeModal() {
    this.setState({
      editState: false,
      selectedFile: null,
      status: null,
      message: null,
    }, () => {
      this.props.onHide();
    });
  }
}