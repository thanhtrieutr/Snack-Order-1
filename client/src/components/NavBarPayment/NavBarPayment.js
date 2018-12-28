
import React from 'react';
import '././style.scss'
import {Nav, NavItem, Grid} from 'react-bootstrap';
import Image from './../Home/image'

class NavBarAdmin extends React.Component {
  render() {
    return (
      <div className="checkout-header">
      <Grid>
          <div className="checkout-logo col-xs-offset-3 col-sm-offset-8 col-md-offset-9">
              <Image imgName="/static/images/logo.png" class="logo col-xs-12"></Image>
          </div>
          <div className="checkout-menu col-xs-12 col-sm-8">
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
      </Grid>
      </div>
    );
  }
}

export default NavBarAdmin