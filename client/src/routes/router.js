import React, { Component } from 'react';
import Profile from '../pages/Profile/index';
import Home from '../pages/Home';
import ProfileChangePassword from "../pages/Profile.ChangePassword/index"
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
            {/* <Route path="/" component={Home} /> */}
            <Route path="/profile" exact component={Profile} />
            <Route path="/profile/change-password" exact component={ProfileChangePassword} />
        </div>
     </Router>
    );
}

export default Routerx;
