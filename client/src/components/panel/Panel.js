import React from 'react'
import { Panel } from 'react-bootstrap'

export default class Guide extends React.Component {
  render () {
    return (
      <Panel bsStyle={this.props.bsStyle}>
      <Panel.Heading>
        <Panel.Title componentClass="h3">{this.props.title}</Panel.Title>
      </Panel.Heading>
      <Panel.Body>
        {this.props.content}
      </Panel.Body>
    </Panel>
    )
  }
}
