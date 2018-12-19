import React from 'react';
import {Grid, Col} from 'react-bootstrap'
import AdminApi from '../../helpers/api/admin.api'
import HeaderTag from '././components/headerTag'
import Content from '././components/content';
import LinkAdminPage from './../../components/LinkAdminPage/LinkAdminPage'
import NavBarAdmin from './../../components/NavBarAdmin/NavBarAdmin'
import './index.scss'

class AddNewProduct extends React.Component {

  componentWillMount() {
    var token = { token: localStorage.getItem("token")};
    AdminApi.checkToken(token, (result) => {
      console.log(result);
      if (result === false) {
        alert("You haven't logged in");
        window.location.href = "/admin/login";
      }
    })
  }

  render() {
    return (
        <div className="admin-create-product">
            <HeaderTag/>
            <Grid>
                <LinkAdminPage activeMenuItem="add-product"></LinkAdminPage>
                <Col xs={12} md={9} lg={10}>
                  <NavBarAdmin activeMenuItem="add-product"></NavBarAdmin>
                  <Content/>
                </Col>
            </Grid>
        </div>
    );
  }
}

export default AddNewProduct