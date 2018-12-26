import React from 'react';
import './style.scss';
import HeadTag from './components/HeadTag'
import { Grid } from 'react-bootstrap'
import LinkAdminPage from "../../components/LinkAdminPage/LinkAdminPage"
import OrderField from './components/OrderField'
import {checkToken} from '../../helpers/api/adminApi/check-token'
import NavBarAdmin from '../../components/NavBarAdmin/NavBarAdmin'
import { withRouter } from "react-router";
class AdminTodayOrder extends React.Component {
    componentWillMount() {
        var token = { token: localStorage.getItem("token")};
        checkToken(token, (result) => {
            if (result === false) {
                alert("You haven't logged in");
                this.props.history.push('/admin/login');
            }
        })
    }
    render() {
        return (
            <div className="admin-today-order"> 
                <HeadTag></HeadTag>
                <Grid>
                    <NavBarAdmin activeMenuItem="today-order"></NavBarAdmin>
                    <LinkAdminPage activeMenuItem="today-order"></LinkAdminPage>
                    <OrderField></OrderField>
                </Grid>
            </div>
        );
    }
}

export default withRouter(AdminTodayOrder);