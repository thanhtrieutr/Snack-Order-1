import React, { Component } from 'react';
// import { Helmet } from 'react-helmet';
import Content from './components/Content';
import Menu from './components/Menu';

class ForgotPassword extends Component {
  render () {
    return (
      <div className="columns container is-fullhd">
        {/* <Helmet>
          <title>Admin</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css"/>
          <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
        </Helmet> */}
        <Menu/>
        <Content/>
      </div>
    )
  }
}

export default ForgotPassword;