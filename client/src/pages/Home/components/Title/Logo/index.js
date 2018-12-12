import React, { Component } from 'react'
import Image from '../../../../../components/Home/image'

export default class Logo extends Component {
  render() {
    return (
			<div className="title cl-xs-12 logo-container">
					<Image imgName="/static/images/logo.png" class="logo"></Image>
			</div>
    )
  }
}