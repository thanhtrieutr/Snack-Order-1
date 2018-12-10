import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Table} from 'react-bootstrap'
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
    var listHistory = historyList.reverse().map((item, index) => {
      return (
        <div key={item._id} index={index+1} id={`order-container-${index+1}`}>
          <Table responsive={true} > 
            <tbody>
                <tr>
                  <td className="display-item"> Account: {item.user}  </td>
                  <td className="display-item"> Total: {displayPrice(item.actualTotalPrice)}  </td>
                  <td className="display-item"> Time: {item.time} </td>
                </tr>
            </tbody>
          </Table>
          <HistoryDetailTable historyTableData={item.products}/>
        </div>
      );
    })
    return listHistory;
  }
}

export default HistoryContainer