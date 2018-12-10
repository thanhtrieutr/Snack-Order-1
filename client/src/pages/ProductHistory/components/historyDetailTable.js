import React, {Component} from 'react';
import TitleContainer from '././titleContainer';
import {displayPrice} from './../scripts/displayPrice';

class HistoryContainer extends Component {
  render () {
    return (
    <div>
      {this.loadHistoryTable(this.props.historyTableData)}
    </div>
    )
  }
  loadHistoryTable(historyData) {
    var listHistory = historyData.map((item, index) => {
      return (
        <div key={index} index={index+1} id='order-detail'>
          <table className="table" > 
            <tbody>
                <TitleContainer/>
                <tr>
                    <td className="display-item">
                        {item.name}
                    </td>
                    <td className="display-item">
                        {item.quantity}
                    </td>
                    <td className="display-item">
                        {displayPrice(item.price)}
                    </td>
                    <td className="display-item">
                        {displayPrice(item.totalPrice)}
                    </td>
                    <td className="display-item">
                        {item.status}
                    </td>
                </tr>
            </tbody>
          </table>
        </div>
      );
    })
    return listHistory;
  }
}

export default HistoryContainer