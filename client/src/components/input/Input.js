import React from 'react'
import './input.css'

export default class Input extends React.Component {
  render () {
    return (
      <div className="field">
        <input type={this.props.type} placeholder={this.props.placeholder} value={this.props.value} 
            onChange={this.props.changeText} className="forget-input" id={this.props.id}>
        </input>
      </div>
    )
  }
}
