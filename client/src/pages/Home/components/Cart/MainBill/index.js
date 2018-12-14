
import React, { Component } from 'react'
import CartItem from './CartItem/index'
import {displayPrice} from '../../../script/displayPrice'

export default class MainBill extends Component {
    constructor() {
        super();
        this.createCart = this.createCart.bind(this);
    }
    render() {
        return(
            <div className="main-bill-form" id="still-main-bill-form">
                {this.createCart(this.props.cartList)}
            </div>
        )
    }
    createCart(cartList) { 
        var cart = cartList.map((item, index) => { 
          if (item !=  -1){
            return (
                <CartItem key={index} valueIndex={index} index={item+1} name={this.props.productList[item].name} price={displayPrice(this.props.productList[item].price * this.props.amountList[index])} amount={this.props.amountList[index]} amountHandler={this.props.amountHandler}></CartItem>
            )
          }
        });
        return cart;
      }
}

