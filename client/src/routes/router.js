import React from 'react';
import Profile from '../pages/Profile/index';
import adminHome from '../pages/adminHome/index';
import ProfileChangePassword from "../pages/profileChangePassword/index";
import AdminLogin from '../pages/admin.Login/index';
import AdminTodayOrder from '../pages/admin.todayOrder/index';
import ForgotPassword from '../pages/ForgetPassword/ForgotPassword';
import AddNewUser from '../pages/admin.addUser/AddNewUser';
import ProductList from '../pages/admin.productList/ProductList';

import { Switch, Route } from 'react-router'

function Routerx() {
    return (
     <Switch>
        <Route path="/profile" exact component={Profile} />
        <Route path="/profile/change-password" exact component={ProfileChangePassword} />
        <Route path="/forget-password" exact component={ForgotPassword}/>

        <Route path="/admin" exact component={adminHome} />
        <Route path='/admin/login' exact component={AdminLogin}/>
        <Route path='/admin/today-order' exact component={AdminTodayOrder}/>
        <Route path="/admin/user/add" exact component={AddNewUser}/>
        <Route path="/admin/products" exact component={ProductList}/>
    </Switch>
    );
}

export default Routerx;
