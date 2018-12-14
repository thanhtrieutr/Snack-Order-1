import React, {Component} from 'react';
import {Table} from 'react-bootstrap'
import {displayPrice} from './../scripts/displayPrice';
import HistoryDetailTable from '././historyDetailTable';

class HistoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: -1
    }
    this.loadOrderHistory = this.loadOrderHistory.bind(this);
    this.toggleShowHistory = this.toggleShowHistory.bind(this);
  }

  render () {
    return (
      <div>
        {this.loadOrderHistory(this.props.historyContainer, this.props.dataLength)}
      </div>
    )
  }
  loadOrderHistory(historyList) {
    var listHistory = historyList.map((item, index) => {
      return (
        <div key={item._id} index={index} id={`order-container-${index+1}`} >
          <Table id={`order-detail-${index+1}`} > 
          <thead>
            <tr>
              <td className="display-item col-xs-4"> 
                <b> Account </b> <br/> {item.user}  
              </td>
              <td className="display-item col-xs-3"> 
                <b> Total </b> <br/> {displayPrice(item.actualTotalPrice)} 
              </td>
              <td className="display-item col-xs-3"> 
                <b> Time </b> <br/> {item.time} 
              </td>
              <td className="display-item col-xs-2"> 
                <button onClick={(event) => this.toggleShowHistory(event, index)}>
                  Show <br/> Details
                </button>
              </td>
            </tr>
          </thead>
          </Table>
          <div id={`order-history-detail-table-${index+1}`}  style={{display: this.state.activeItem === index ? 'block' : (this.state.activeItem === -1 ? 'none' : 'none')}}>
            <HistoryDetailTable historyTableData={item.products} index={index} active={this.state.activeItem}/>
          </div>
        </div>
      );
    })
    return listHistory;
  }

  toggleShowHistory(event, index) {
    console.log(index);
    var status = this.state.activeItem
    if (index === status) {
      this.setState({
        activeItem: -1
      })
    } else {
      this.setState({
        activeItem: index
      })
    }
    
    
  }
}

export default HistoryContainer