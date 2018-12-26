import React, { Component } from 'react'
import logo from '../../../../../assets/images/logo.png'
export default class Logo extends Component {
  render() {
    return (
			<div className="title cl-xs-12 logo-container">
          <img alt="imageAlt" className="logo" src={logo} />
			</div>
    )
  }
}