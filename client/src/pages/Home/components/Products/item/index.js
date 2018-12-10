import React, { Component } from 'react'
import Image from "../../../../../components/Home/image"
import Name from "../../../../../components/Home/name"
import Checkbox from "../../../../../components/Home/checkbox"

export default class Item extends Component {
  render() {
    return (
      <label className="one-snack cl-md-3 cl-sm-4 cl-xs-6" htmlFor={"checkbox-" + this.props.index}>
        <Image class="snack-img" imgName={this.props.imgName}></Image>
        <Name class="main-snack-name" id={"snack-name-"+this.props.index} name={this.props.name}></Name>
        <Name class="main-snack-price" id={"snack-price-"+this.props.index} name={this.props.price}></Name>
        <Checkbox dataId={this.props.dataId} index={this.props.index} checkboxHandler={this.props.checkboxHandler}></Checkbox>
      </label>
    )
  }
}

// checkboxHandler={this.props.checkboxHandler