import React, {Component} from 'react';
import {displayPrice} from './../script/displayPrice';

class DetailContainer extends Component {
  render () {
    return (
      <tr>
        <th>  {this.props.name}  </th>
        <th>  {this.props.quantity} </th> 
        <th>  {displayPrice(this.props.price)}  </th>
        <th>  {displayPrice(this.props.totalPrice)} </th>
        <th>  {this.props.status} </th>
      </tr>
    )
  }
}

export default DetailContainer