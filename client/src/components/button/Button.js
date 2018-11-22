import React, { Component } from 'react';
import './button.css'

class Button extends Component {
  render () {
    return (
      <button onClick={this.props.onClick}>{this.props.purpose}</button>
    )
  }
}

export default Button;