import React from 'react'
import { Modal, Button, Col, Row } from 'react-bootstrap'
import { Image } from 'react-bootstrap'

export default class UserDetail extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Modal show={this.props.show} bsSize={this.props.bsSize}>
        <Modal.Header>
          <Modal.Title>{this.props.user}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col xs={12} sm={3}>
              <Image alt="user" src={`http://127.0.0.1:3000${this.props.avatarAddress}`} thumbnail responsive></Image>
            </Col>
            <Col xs={12} sm={4}>
              <div className="admin-user-div">
                Fullname: {this.props.fullName}
              </div>
              <div className="admin-user-div">
                Phone: {this.props.phoneNumber}
              </div>
              <div className="admin-user-div">
                Birthday: {this.props.birthday}
              </div>
              <div className="admin-user-div">
                Address: {this.props.address}
              </div>
            </Col>
            {/* <Col xs={12} sm={5}>
              <Sale/>
              <div> 
                <h3>Price</h3>

                {this.state.editState === false ? 
                  <p className="admin-product-price"> {this.props.price} vnđ</p> : 
                  <InputField changeText={this.changePrice} value={this.state.newPrice} type="text" 
                  placeholder="* Enter price" bsSize="large" inputSize={12}
                  validationState={this.state.status}/>}
              </div>
            </Col> */}
          </Row>
        </Modal.Body>

        <Modal.Footer>
          {/* <p className={"admin-status " + this.state.status}>{this.state.message}</p> */}
          <Button onClick={this.props.onHide}>Close</Button>
          {/* {this.state.editState === false? 
            <Button bsStyle="primary" onClick={this.editPrice}>Edit</Button>
          : <div className="admin-button-div">
              <Button className="admin-product-button" onClick={this.cancelEdit}>Cancel</Button>
              <Button bsStyle="primary" onClick={this.saveInfo}>Save</Button>
            </div>} */}
        </Modal.Footer>
      </Modal>
    )
  }
}