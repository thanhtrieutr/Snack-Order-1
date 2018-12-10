import React from 'react';
import Profile from '../pages/profile/index';
// import Home from '../pages/Home';
import ProfileChangePassword from "../pages/profileChangePassword/index";
import AdminLogin from '../pages/admin.Login/index';
import AdminTodayOrder from '../pages/admin.todayOrder/index';
import ForgotPassword from '../pages/ForgetPassword/ForgotPassword';
import AddNewUser from '../pages/AddUser/AddNewUser';
import AdminOrderHistory from './../pages/ProductHistory/index'

import {
    BrowserRouter as Router,
    Route,
  } from "react-router-dom";

function Routerx() {
    return (
     <Router>
         <div>
            {/* <Route path="/" component={Home} /> */}
            <Route path="/profile" exact component={Profile} />
            <Route path="/profile/change-password" exact component={ProfileChangePassword} />
            <Route path='/admin/login' exact component={AdminLogin}/>
            <Route path='/admin/today-order' exact component={AdminTodayOrder}/>
            <Route path="/admin/user/add" exact component={AddNewUser}/>
            <Route path="/forget-password" exact component={ForgotPassword}/>
            <Route path="/admin/order-history" exact component={AdminOrderHistory}/>
        </div>
     </Router>
    );
}

export default Routerx;
