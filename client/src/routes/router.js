import React from 'react';
import Profile from '../pages/Profile/index';
import Home from '../pages/Home/index';
import ProfileChangePassword from "../pages/profileChangePassword/index";
import AdminHome from "../pages/adminHome/index";
import AdminLogin from '../pages/admin.Login/index';
import AdminTodayOrder from '../pages/admin.todayOrder/index';
import ForgotPassword from '../pages/ForgetPassword/ForgotPassword';
import AddNewUser from '../pages/../pages/admin.addUser/AddNewUser';
import AdminOrderHistory from './../pages/OrderHistory/index'
import ProductList from '../pages/admin.productList/ProductList';
import UserList from '../pages/admin.userList/index';
import AddNewProduct from './../pages/admin.addProduct/index';
import Login from '../pages/Login/index';
import { Switch, Route } from 'react-router'

function Routerx() {
    return (
     <Switch>
        <Route path="/profile" exact component={Profile} />
        <Route path="/profile/change-password" exact component={ProfileChangePassword} />
        <Route path="/forget-password" exact component={ForgotPassword}/>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login}/>

        <Route path="/admin" exact component={AdminHome} />
        <Route path='/admin/login' exact component={AdminLogin}/>
        <Route path='/admin/today-order' exact component={AdminTodayOrder}/>
        <Route path="/admin/user/add" exact component={AddNewUser}/>
        <Route path="/admin/products" exact component={ProductList}/>
        <Route path="/admin/history" exact component={AdminOrderHistory}/>
        <Route path="/admin/users" exact component={UserList}/>
        <Route path="/admin/product/add" exact component={AddNewProduct}/>
    </Switch>
    );
}

export default Routerx;
