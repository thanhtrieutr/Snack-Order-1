import React, { Component } from 'react';
import Profile from '../pages/Profile/index';
import Home from '../pages/Home';
import ProfileChangePassword from "../pages/Profile.ChangePassword/index";
import UserLogin from '../pages/userLogin/index';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
  } from "react-router-dom";

function Routerx() {
    return (
     <Router>
         <div>
            <Route path="/user-login" exact component={UserLogin}/>
            <Route path="/" component={Home} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/profile/change-password" exact component={ProfileChangePassword} />
            <Route path='/admin/login' exact component={AdminLogin}/>
        </div>
     </Router>
    );
}

export default Routerx;
