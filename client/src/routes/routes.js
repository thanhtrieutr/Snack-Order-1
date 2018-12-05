import React from 'react';
import ForgotPassword from '../pages/ForgetPassword/ForgotPassword';
import AddNewUser from '../pages/AddUser/AddNewUser';

import {
    BrowserRouter as Router,
    Route,
  } from "react-router-dom";

function Routerx() {
    return (
     <Router>
         <div>
            <Route path="/admin/create-user" exact component={AddNewUser}/>
            <Route path="/forget-password" exact component={ForgotPassword}/>
        </div>
     </Router>
    );
}

export default Routerx;
