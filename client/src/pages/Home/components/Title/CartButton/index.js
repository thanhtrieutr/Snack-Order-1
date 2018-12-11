import React, { Component } from 'react'
import ButtonClick from '../../../../../components/Home/button'

export default class CartButton extends Component {
  render() {
    return (
      <ButtonClick buttonHandler={this.props.cartHandler} id="cart-button" className="fa cl-xs-2" content={<i className="fa fa-shopping-cart"></i>}></ButtonClick>
    )
  }
} 