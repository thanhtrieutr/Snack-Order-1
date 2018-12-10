import React, { Component } from 'react'
import Item from './item/index'
import {displayPrice} from '../../../../pages/Home/script/displayPrice'

export default class Products extends Component {
  constructor(){
    super();
    this.createProductList = this.createProductList.bind(this);
  }
  render() { 
    return(
      <div className="cl-xs-12 cl-md-8 cl-xl-9" id="main-order">
        <div>{this.createProductList(this.props.productList)}</div>
      </div>
    )
  }
  createProductList(productList) { 
    var listProduct = productList.map((item, index) => { 
      return (
        <Item key={index} index={index+1} imgName={item.img} name={item.name} price={displayPrice(item.price)} dataId={item._id} checkboxHandler={this.props.checkboxHandler}></Item>
      )
    });
    return listProduct;
  }
}
  