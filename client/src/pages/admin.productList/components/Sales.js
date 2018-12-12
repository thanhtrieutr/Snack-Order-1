import React from 'react'
import { Table } from 'react-bootstrap'

export default class Sales extends React.Component {
  render () {
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>#</th>
            <th>In month</th>
            <th>In season</th>
            <th>In year</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2016</td>
            <td>10</td>
            <td>100</td>
            <td>1000</td>
          </tr>
          <tr>
            <td>2017</td>
            <td>20</td>
            <td>200</td>
            <td>2000</td>
          </tr>
        </tbody>
      </Table>
    )
  }
}