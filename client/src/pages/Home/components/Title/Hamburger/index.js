import React, { Component } from 'react'
import Link from '../../../../../components/Home/link'

export default class Hamburger extends Component {
  render() {
    return (
      <Link redirect={this.props.hamburgerHandler} id="hamburger-button" class="fa cl-xs-2" content={<i className="fa fa-bars"></i>}></Link>
    )
  }
}