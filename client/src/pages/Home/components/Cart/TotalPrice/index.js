import React, { Component } from 'react'
import Name from '../../../../../components/Home/name'

export default class TotalPrice extends Component {
    constructor(){ 
        super();
    }
    render() {
        return (
        <div className="total">
            <Name id="total-price" name="Total price: "></Name>
            <Name id="total-price-number" name={this.props.total} ></Name>
        </div>
        )
    }
}
