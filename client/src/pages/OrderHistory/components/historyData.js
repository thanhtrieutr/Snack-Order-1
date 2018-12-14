import React, {Component} from 'react';
import {displayPrice} from './../scripts/displayPrice';

class HistoryData extends Component {
  render () {
    return (
      <tbody>
        {this.loadHistoryTable(this.props.historyTableData)}
      </tbody>
    )
  }
  loadHistoryTable(historyData) {
    var listHistory = historyData.map((item, index) => {
      return (
        <tr key={item._id} index={index+1} id={`order-data-${index+1}`}>
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

export default HistoryData