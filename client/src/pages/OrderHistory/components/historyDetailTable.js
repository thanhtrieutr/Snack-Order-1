import React, {Component} from 'react';
import {Table} from "react-bootstrap"
import TitleContainer from '././titleContainer';
import HistoryData from '././historyData';

class HistoryContainer extends Component {
  render () {
    return (
      <Table bordered={true} responsive={true} > 
        <TitleContainer/>
        <HistoryData historyTableData={this.props.historyTableData}/>
      </Table>
    )
  }
}

export default HistoryContainer