import React from 'react'
import { Modal, Button, Col, Row } from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import {API_ROOT} from '../../../api-config'

export default class UserDetail extends React.Component {
  // constructor() {
  //   super();
  // }
  render() {
    return (
      <Modal show={this.props.show} bsSize={this.props.bsSize}>
        <Modal.Header>
          <Modal.Title>{this.props.user}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col xs={12} sm={3}>
              <Image alt="user" src={`${API_ROOT}${this.props.avatarAddress}`} thumbnail responsive></Image>
            </Col>
            <Col xs={12} sm={9}>
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
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}