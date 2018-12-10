import React, {Component} from 'react';
import {Table} from "react-bootstrap"
import TitleContainer from '././titleContainer';
import {displayPrice} from './../scripts/displayPrice';

class HistoryContainer extends Component {
  render () {
    return (
      <Table bordered={true} responsive={true}> 
        <TitleContainer/>
        {this.loadHistoryTable(this.props.historyTableData)}
      </Table>
    )
  }
  loadHistoryTable(historyData) {
    var listHistory = historyData.map((item, index) => {
      return (
        <tbody key={item._id} index={index+1} id={`order-detail-${index+1}`}>
          <tr>
            <td className="display-item"> {item.name} </td>
            <td className="display-item"> {item.quantity} </td>
            <td className="display-item"> {displayPrice(item.price)} </td>
            <td className="display-item"> {displayPrice(item.totalPrice)} </td>
            <td className="display-item"> {item.status} </td>
          </tr>
        </tbody>
      );
    })
    return listHistory;
  }
}

export default HistoryContainer