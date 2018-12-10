import React, { Component } from 'react'
import MainBill from './MainBill/index'

export default class Cart extends Component {
  render() {
    return (
      <div id="bill-form" className="cl-xs-12 cl-md-4 cl-xl-3">
        <h1>Cart</h1>
        <MainBill cartList={this.props.cartList} productList={this.props.productList} amountList={this.props.amountList} amountHandler={this.props.amountHandler} ></MainBill>
      </div>
    )
  }
}

{/* <div class="cl-xs-12 cl-md-4 cl-xl-3" id="bill-form">
                    <h1>Cart</h1>
                    <div class="main-bill-form" id="still-main-bill-form">
                        <!-- <div class="order-thing" id="cart-1"> 
                            <span class="name-of-snack">Snack Mực Tẩm Gia Vị Cay Ngọt Bento (24g)</span>
                            <span class="price-of-snack">19.000 ₫</span>
                            <span class="number-of-snack">
                                <button class="number-button">-</button>
                                1
                                <button class="number-button">+</button>
                            </span>
                        </div> -->
                    </div>
                    <div class="total">
                        <div id="total-price">Total price: </div>
                        <div id="total-price-number"></div>
                    </div>
                    <button class="my-button" id="order-button">Order</button>
                </div> */}