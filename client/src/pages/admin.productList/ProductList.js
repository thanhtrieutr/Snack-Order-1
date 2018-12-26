import React from 'react'
import Helmet from 'react-helmet'
import { Grid } from 'react-bootstrap'
import {checkToken} from '../../helpers/api/adminApi/check-token'
import LinkAdminPage from "../../components/LinkAdminPage/LinkAdminPage"
import NavBarAdmin from '../../components/NavBarAdmin/NavBarAdmin'
import Content from './components/Content'
import { withRouter } from "react-router";

export default withRouter(class ProductList extends React.Component {
    componentWillMount() {
        var token = { token: localStorage.getItem("token")};
        checkToken(token, (result) => {
            console.log(result);
            if (result === false) {
                alert("You haven't logged in");
                this.props.history.push('/admin/login');
            }
        })
    }
    render() {
        return (
            <div className="admin-products">
                <Helmet>
                    <title>Admin | Product List</title>
                </Helmet>
                <Grid>
                    <NavBarAdmin activeMenuItem="products"></NavBarAdmin>
                    <LinkAdminPage activeMenuItem="products"></LinkAdminPage>
                    <Content/>
                </Grid>
            </div>
        );
    }
})
