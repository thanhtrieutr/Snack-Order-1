import React from 'react';
import {getProductHistory} from '././scripts/loadHistoryData';
import HistoryContainer from '././components/historyContainer';

class AdminOrderHistory extends React.Component {
  constructor() {
    super()
    this.state = {
      orderHistory: []
    }
  }
  
  componentWillMount() {
    getProductHistory(result => {
      this.setState({
        orderHistory: result
      })
    })
  }

  render() {
    return (
      <div>
          <HistoryContainer historyContainer={this.state.orderHistory}/>
      </div>
    )
  }

  
}

export default AdminOrderHistory;