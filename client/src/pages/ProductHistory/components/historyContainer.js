import React, {Component} from 'react';
import {displayPrice} from './../scripts/displayPrice';
import HistoryDetailTable from '././historyDetailTable';

class HistoryContainer extends Component {
  render () {
    return (
    <div>
      {this.loadOrderHistory(this.props.historyContainer)}
    </div>
    )
  }
  loadOrderHistory(historyList) {
    var listHistory = historyList.map((item, index) => {
      return (
        <div key={index} index={index+1} id="display-container">
          <table className="table" > 
            <tbody>
                <tr>
                    <td className="display-item">
                        Account: {item.user}
                    </td>
                    <td className="display-item" >
                        Total: {displayPrice(item.actualTotalPrice)}
                    </td>
                    <td className="display-item">
                        Time: {item.time}
                    </td>
                </tr>
            </tbody>
          </table>
          <HistoryDetailTable historyTableData={item.products}/>
        </div>
      );
    })
    return listHistory;
  }
}

export default HistoryContainer