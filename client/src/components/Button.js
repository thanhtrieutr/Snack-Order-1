import React, { Component } from 'react';

class Button extends Component {
  render () {
    return (
      <button type={this.props.type} className={`button ${this.props.className}`} id={this.props.id}
        onClick={this.props.onClick}>{this.props.label}</button>
    )
  }
}

export default Button;