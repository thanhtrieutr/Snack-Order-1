import React from 'react';
import {Grid, Col} from 'react-bootstrap'
import {checkToken} from '../../helpers/api/adminApi/check-token'
import HeaderTag from '././components/headerTag'
import Content from '././components/content';
import NavBarAdmin from './../../components/NavBarAdmin/NavBarAdmin'
import LinkAdminPage from '../../components/LinkAdminPage/LinkAdminPage'
import { withRouter } from "react-router";
import './index.scss'

class AddNewProduct extends React.Component {

  componentWillMount() {
    var token = { token: localStorage.getItem("token")};
    checkToken(token, (result) => {
      console.log(result);
      if (result === false) {
        alert("You haven't logged in");
        this.props.history.push("/admin/login");
      }
    })
  }

  render() {
    return (
        <div className="admin-create-product">
            <HeaderTag/>
            <Grid>
                <NavBarAdmin activeMenuItem="add-product"></NavBarAdmin>
                <LinkAdminPage activeMenuItem="add-product"></LinkAdminPage>
                <Col xs={12} md={9} lg={10}>
                  <Content/>
                </Col>
            </Grid>
        </div>
    );
  }
}

export default withRouter(AddNewProduct)