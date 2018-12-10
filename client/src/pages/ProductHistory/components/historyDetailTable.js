import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Table} from "react-bootstrap"
import TitleContainer from '././titleContainer';
import {displayPrice} from './../scripts/displayPrice';

class HistoryContainer extends Component {
  render () {
    return (
      <Table bordered={true} responsive={true}> 
        <thead>
        <TitleContainer/>
        </thead>
        <tbody>
          {this.loadHistoryTable(this.props.historyTableData)}
        </tbody>
      </Table>
    )
  }
  loadHistoryTable(historyData) {
    var listHistory = historyData.map((item, index) => {
      return (
        <tr key={item._id} index={index+1} id={`order-detail-${index+1}`}>
            <td className="display-item"> {item.name} </td>
            <td className="display-item"> {item.quantity} </td>
            <td className="display-item"> {displayPrice(item.price)} </td>
            <td className="display-item"> {displayPrice(item.totalPrice)} </td>
            <td className="display-item"> {item.status} </td>
        </tr>
      );
    })
    return listHistory;
  }
}

export default HistoryContainer