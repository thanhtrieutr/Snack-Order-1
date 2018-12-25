import React from 'react'
import Helmet from 'react-helmet'
import { Grid } from 'react-bootstrap'
import {checkToken} from '../../helpers/api/adminApi/check-token'
import LinkAdminPage from "../../components/LinkAdminPage/LinkAdminPage"
import Content from './components/Content'

export default class ProductList extends React.Component {
    componentWillMount() {
        var token = { token: localStorage.getItem("token")};
        checkToken(token, (result) => {
            console.log(result);
            if (result === false) {
                alert("You haven't logged in");
                window.location.href = "/admin/login";
            }
        })
    }
    render() {
        return (
            <div className="admin-users">
                <Helmet>
                    <title>Admin | User List</title>
                </Helmet>
                <Grid>
                    <LinkAdminPage activeMenuItem="users"></LinkAdminPage>
                    <Content/>
                </Grid>
            </div>
        );
    }
}
