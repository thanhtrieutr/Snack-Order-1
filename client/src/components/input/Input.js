import React, { Component } from 'react';
import './input.css'

class Input extends Component {
  render () {
    return (
      <input type={this.props.type} placeholder={this.props.placeholder} value={this.props.value} 
            onChange={this.props.changeText} name={this.props.name}>
      </input>
    )
  }
}

export default Input;