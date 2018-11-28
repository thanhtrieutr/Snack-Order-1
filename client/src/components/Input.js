import React, { Component } from 'react';

class Input extends Component {
  render () {
    return (
      <div className="field">
        <input type={this.props.type} placeholder={this.props.placeholder} value={this.props.value} 
            onChange={this.props.changeText} className={`input ${this.props.className}`} 
            id={this.props.id}>
        </input>
      </div>
    )
  }
}

export default Input;