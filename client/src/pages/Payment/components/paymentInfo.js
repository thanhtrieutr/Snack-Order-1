
import React from 'react';
import ButtonClick from './../../../components/Home/button'
import HeaderTag from '././headerTag';
import NavBarPayment from './../../../components/NavBarPayment/NavBarPayment';
import {Col, Grid} from 'react-bootstrap';
import Image from './../../../components/Home/image'
import './../style.scss'

class PaymentInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      paymentMethod: 1
    }
    this.selectorHandler = this.selectorHandler.bind(this);
    this.goBackHomePage = this.goBackHomePage.bind(this);
    this.goToReviewOrder = this.goToReviewOrder.bind(this);
  }

  render() {
    return (
      <div className="payment-page">    
        <div className="payment-method">
        <HeaderTag/>
          <Grid>
            <Col xs={12}>
              <NavBarPayment activeKey={1}/>
            </Col>
            <div className="select-method col-xs-12 col-sm-7">  
              <div className="select-method-title">
                <b> PAYMENT METHOD </b>
              </div>
              <div className="select-method-body">
                <p> Please select a payment method </p>
                <div className="payment-selector">          
                  <select value={this.state.paymentMethod} onChange={(event) => this.selectorHandler(event)}>
                    <option value="1">Cash On Delivery</option>
                    <option value="2">Zalo Pay</option>
                    <option value="3">Paypal</option>
                  </select>
                </div>
                <div className="payment-description">
                  <p> * You'll have a chance to review your order before it's placed. </p>
                </div>
                <div className="confirm-method">
                  <ButtonClick className="payment-button col-xs-3 col-xs-offset-2" buttonHandler={(event) => this.goBackHomePage(event)} content="Go Back" />
                  <ButtonClick className="payment-button col-xs-3 col-xs-offset-2" buttonHandler={(event) => this.goToReviewOrder(event)} content="Continue"/>
                </div>
              </div>
            </div>
              <div className="payment-logo-gallery col-xs-12 col-sm-offset-1 col-sm-4">
                <div className="logo-gallery-title">
                  <b> PAYMENT METHODS </b>
                </div>
                <div className="logo-gallery-description">
                  <p> We accept the following payment methods </p>
                </div>
                <div className="logo-gallery-main">
                  <Image imgName="/static/images/payment-icon-1.png" class="payment-logo col-xs-offset-2"></Image>
                  <Image imgName="/static/images/payment-icon-2.png" class="payment-logo col-xs-offset-2"></Image>
                  <Image imgName="/static/images/payment-icon-3.png" class="payment-logo col-xs-offset-2"></Image>
                </div>
              </div>
          </Grid>
        </div>
      </div>
    );
  }
  selectorHandler(event) {
    this.setState({
      paymentMethod: event.target.value
    })
  }
  goBackHomePage(event) {
    this.props.history.push("/");
  }
  goToReviewOrder(event) {
    this.props.history.push("/review-order");
  }
}

export default PaymentInfo