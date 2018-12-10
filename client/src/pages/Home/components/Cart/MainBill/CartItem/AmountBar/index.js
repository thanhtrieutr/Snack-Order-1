import React, { Component } from 'react'
import Span from '../../../../../../../components/Home/span'
import ButtonClick from '../../../../../../../components/Home/button'

export default class AmountBar extends Component {
    constructor() {
        super();
        this.buttonHandler = this.buttonHandler.bind(this);
    }
    buttonHandler(status) { 
        this.props.amountHandler(status, this.props.valueIndex);
    }
    render() {
        return(
           <span className="number-of-snack offset-xs-4 offset-sm-7 cl-sm-2 offset-md-1 cl-md-3">
                <ButtonClick className="number-button" id={"minus-button-" + this.props.index} content="-"></ButtonClick>
                <Span id={"amount-" + this.props.index} class="amount-display" content={this.props.amount}></Span>
                <ButtonClick className="number-button" id={"add-button-" + this.props.index} content="+"></ButtonClick>
           </span>
        )
    }
}

