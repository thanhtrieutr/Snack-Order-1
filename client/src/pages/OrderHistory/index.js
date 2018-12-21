import React from 'react';
import {Grid, Col} from 'react-bootstrap'
import {getProductHistory} from '././scripts/loadHistoryData';
import AdminApi from '../../helpers/api/adminApi/check-token';
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
          <LinkAdminPage activeMenuItem="order-history"></LinkAdminPage>
            <Col xs={12} md={9} lg={10}>
              <NavBarAdmin activeMenuItem="order-history"></NavBarAdmin>
              <HistoryContainer historyContainer={this.state.orderHistory} dataLength={this.state.dataLength}/>
            </Col>
          </Grid>
      </div>
    )
  }
}

export default AdminOrderHistory;