import React from 'react';
import {Grid} from 'react-bootstrap'
import {getProductHistory} from '././scripts/loadHistoryData';
import AdminApi from '../../helpers/api/admin.api'
import HeaderTag from '././components/headerTag'
import HistoryContainer from '././components/historyContainer';
import LinkAdminPage from './../../components/LinkAdminPage/LinkAdminPage'
import NavBarAdmin from './../../components/NavBarAdmin/NavBarAdmin'
import '././index.scss'

class AdminOrderHistory extends React.Component {
  constructor() {
    super();
    
    this.state = {
      orderHistory: [],
      dataLength: 0
    }
  }
  
  componentWillMount() {
    var token = { token: localStorage.getItem("token")};
    AdminApi.checkToken(token, (result) => {
      console.log(result);
      if (result === false) {
        alert("You haven't logged in");
        window.location.href = "/admin/login";
      }
    })
    getProductHistory(result => {
      this.setState({
        orderHistory: result
      })
      var data = this.state.orderHistory.reverse();
      this.setState({
        orderHistory: data,
        dataLength: data.length
      })
    })
  }

  render() {
    return (
      <div className="admin-order-history">
          <HeaderTag/>
          <Grid>
            <NavBarAdmin activeMenuItem="order-history"></NavBarAdmin>
				    <LinkAdminPage activeMenuItem="order-history"></LinkAdminPage>
            <HistoryContainer historyContainer={this.state.orderHistory} dataLength={this.state.dataLength}/>
          </Grid>
      </div>
    )
  }
}

export default AdminOrderHistory;