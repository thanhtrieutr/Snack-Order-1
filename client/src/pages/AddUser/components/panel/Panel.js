import React from 'react'
import { Panel } from 'react-bootstrap'

export default class Guide extends React.Component {
  render () {
    return (
      <Panel>
      <Panel.Heading><h4>{this.props.heading}</h4></Panel.Heading>
      <Panel.Body>{this.props.content}</Panel.Body>
    </Panel>
    )
  }
}
