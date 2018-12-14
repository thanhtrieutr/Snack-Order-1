import React, {Component} from 'react';
import {Table} from 'react-bootstrap'
import {displayPrice} from './../scripts/displayPrice';
import HistoryDetailTable from '././historyDetailTable';

class HistoryContainer extends Component {
  constructor() {
    super()
    this.state = {
      showHistory: false,
    }
    this.toggleShowHistory = this.toggleShowHistory.bind(this);

  }

  render () {
    return (
      <div className="col-md-9 col-lg-10">
        {this.loadOrderHistory(this.props.historyContainer)}
      </div>
    )
  }
  loadOrderHistory(historyList) {
    var toggle = this.state.showHistory ? {display: 'block'} : {display: 'none'};
    var listHistory = historyList.map((item, index) => {
      return (
        <div key={item._id} index={index+1} id={`order-container-${index+1}`} >
          <Table id={`order-detail-${index+1}`} onClick={(event) => this.toggleShowHistory(event, index+1)}> 
          <thead>
            <tr>
              <td className="display-item col-xs-5"> 
                Account: {item.user}  
              </td>
              <td className="display-item col-xs-4"> 
                Total: {displayPrice(item.actualTotalPrice)}    
              </td>
              <td className="display-item col-xs-3"> 
                Time: {item.time} 
              </td>
            </tr>
          </thead>
          </Table>
          <div id={`order-history-detail-table-${index+1}`} style={toggle}>
            <HistoryDetailTable historyTableData={item.products} index={index+1}/>
          </div>
        </div>
      );
    })
    return listHistory;
  }
  toggleShowHistory(event, index) {

    var toggleShow = this.state.showHistory;

    console.log(index);
    if (toggleShow === true) {
      this.setState({
        showHistory: false 
      })
    } else {
      this.setState({
        showHistory: true 
      })
    }
  }
}

export default HistoryContainer