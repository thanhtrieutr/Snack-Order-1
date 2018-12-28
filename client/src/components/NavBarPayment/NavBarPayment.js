
import React from 'react';
import '././style.scss'
import {Col, Nav, NavItem, Grid} from 'react-bootstrap';
import Image from './../Home/image'

class NavBarAdmin extends React.Component {
  render() {
    return (
      <div className="checkout-header">
      <Grid>
        <Col xsOffset={3} xs={6} smOffset={8} sm={4}>
          <div className="checkout-logo">
              <Image imgName="/static/images/logo.png" class="logo col-xs-12"></Image>
          </div>
        </Col>
        <Col xs={12} sm={8}>
          <div className="checkout-menu">
          <Nav bsStyle="pills" activeKey={this.props.activeKey} >
            <NavItem eventKey={1} href="/payment/payment-info" >
              Payment Info
            </NavItem>
            <NavItem className="glyphicon glyphicon-arrow-right" disabled> </NavItem>
            <NavItem eventKey={2} href="/payment/review-order" >
              Review & Purchase
            </NavItem>
            <NavItem className="glyphicon glyphicon-arrow-right" disabled> </NavItem>
            <NavItem eventKey={3} href="/payment/confirm-order" >
              Confirm 
            </NavItem>
          </Nav>
          </div>
        </Col>
      </Grid>
      </div>
    );
  }
}

export default NavBarAdmin