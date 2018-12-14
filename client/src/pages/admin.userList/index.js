import React from 'react'
import Helmet from 'react-helmet'
import { Grid } from 'react-bootstrap'
import LinkAdminPage from "../../components/LinkAdminPage/LinkAdminPage"
import Content from './components/Content'

export default class ProductList extends React.Component {
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
