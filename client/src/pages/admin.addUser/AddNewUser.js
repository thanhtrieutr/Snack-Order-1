import React from 'react'
import Helmet from 'react-helmet'
import { Grid } from 'react-bootstrap'
import Content from './components/Content'
import {checkToken} from '../../helpers/api/adminApi/check-token'
import './create-user.css'

export default class AddNewUser extends React.Component {
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
            <div className="admin-create-user">
                <Helmet>
                    <title>Admin | Create user</title>
                </Helmet>
                <Grid>
                    <Content/>
                </Grid>
            </div>
        );
    }
}
