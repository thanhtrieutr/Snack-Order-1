import React from 'react'
import './input.scss'

export default class Input extends React.Component {
  render () {
    return (
      <div className="field">
        <input type={this.props.type} placeholder={this.props.placeholder} value={this.props.value} 
            onChange={this.props.changeText} className={this.props.className} id={this.props.id}>
        </input>
      </div>
    )
  }
}
