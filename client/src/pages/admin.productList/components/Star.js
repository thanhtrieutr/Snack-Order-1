import React from 'react'
import { Glyphicon } from 'react-bootstrap'

export default class Star extends React.Component {
  render () {
    return (
      <div>
        Rated: 
        <Glyphicon glyph="star"/> 
        <Glyphicon glyph="star"/> 
        <Glyphicon glyph="star"/> 
        <Glyphicon glyph="star"/> 
        <Glyphicon glyph="star"/>
      </div>
    )
  }
}