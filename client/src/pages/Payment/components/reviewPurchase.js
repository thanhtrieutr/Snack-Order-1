import React from 'react';
import HeaderTag from '././headerTag';
import NavBarPayment from './../../../components/NavBarPayment/NavBarPayment'

class ReviewOrder extends React.Component {
  render() {
    return (
      <div className="checkout-order">
        <HeaderTag/>
        <NavBarPayment/>
      </div>
    );
  }
}

export default ReviewOrder