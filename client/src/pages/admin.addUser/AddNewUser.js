import React from 'react'
import Helmet from 'react-helmet'
import { Grid } from 'react-bootstrap'
import Content from './components/Content'
import {checkToken} from '../../helpers/api/adminApi/check-token'
import './create-user.scss'
import { withRouter } from "react-router";
import {errorAlert} from '../../helpers/utilities/alert'
export default withRouter(class AddNewUser extends React.Component {
    componentWillMount() {
        var token = { token: localStorage.getItem("token")};
        checkToken(token, (result) => {
            console.log(result);
            if (result === false) {
                errorAlert("You haven't logged in");
                this.props.history.push('/admin/login')
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
})