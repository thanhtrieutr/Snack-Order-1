import React from 'react'
import Helmet from 'react-helmet'
import { Grid } from 'react-bootstrap'
import Content from './components/Content'
import LinkAdminPage from "../../components/LinkAdminPage/LinkAdminPage"
import './create-user.css'

export default class AddNewUser extends React.Component {
    render() {
        return (
            <div className="admin-create-user">
                <Helmet>
                    <title>Admin | Create user</title>
                </Helmet>
                <Grid>
                    <LinkAdminPage activeMenuItem="add-user"></LinkAdminPage>
                    <Content/>
                </Grid>
            </div>
        );
    }
}
