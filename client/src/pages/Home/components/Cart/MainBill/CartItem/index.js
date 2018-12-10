import React, { Component } from 'react'
import Span from '../../../../../../components/Home/span'
import AmountBar from './AmountBar/index'

export default class CartItem extends Component {
    constructor() {
        super();
    }
    render() {
        return(
           <div className="order-thing" id={"cart-" + this.props.index}>
                <Span class="name-of-snack cl-xs-12 cl-sm-12 cl-md-12" content={this.props.name}> </Span>
                <Span id={"price-display-" + this.props.index} class="price-of-snack cl-xs-3 cl-sm-3 cl-md-4" content={this.props.price}></Span>
                <AmountBar valueIndex={this.props.valueIndex} index={this.props.index} amount={this.props.amount} amountHandler={this.props.amountHandler}></AmountBar>
           </div> 
        )
    }
}

