import React from 'react'
import './button.scss'

export default class Button extends React.Component {
  render () {
    return (
      <button type={this.props.type} className={this.props.className} id={this.props.id} onClick={this.props.onClick}>
        {this.props.label}
      </button>
    )
  }
}
