import React from 'react'
import './button.css'

export default class Button extends React.Component {
  render () {
    return (
      <button type={this.props.type} className="forget-button" id={this.props.id}
        onClick={this.props.onClick}>{this.props.label}</button>
    )
  }
}
