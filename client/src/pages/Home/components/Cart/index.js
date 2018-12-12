import React, { Component } from 'react'
import MainBill from './MainBill/index'
import TotalPrice from './TotalPrice/index'
import ButtonClick from '../../../../components/Home/button'
export default class Cart extends Component {
    constructor() { 
        super();
    }
    render() {
        return (
        <div id="bill-form" className="cl-xs-12 cl-md-4 cl-xl-3">
            <h1>Cart</h1>
            <MainBill cartList={this.props.cartList} productList={this.props.productList} amountList={this.props.amountList} amountHandler={this.props.amountHandler} ></MainBill>
            <TotalPrice total={this.props.totalPrice}></TotalPrice>
            <ButtonClick className="my-button" id="order-button" content="Order" buttonHandler={this.props.submitCart}></ButtonClick>
        </div>
        )
    }
}