import React, { Component } from 'react';
import './status.css'

class StatusField extends Component {
  render () {
    return (
      <div>
        <p className={this.props.stat}>{this.props.content}
          { this.props.stat === 'ms_success'?
           <a href={this.props.href}>Return to login</a> : null}
        </p>
      </div>
    )
  }
}

export default StatusField;