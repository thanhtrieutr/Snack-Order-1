import React, { Component } from 'react';
import ContentField from './components/ContentField';
import TabField from './components/TabField';
import './admin.css';
import './mystyles.css';

class ForgotPassword extends Component {
  render () {
    return (
      <div className="columns container is-fullhd">
        <TabField/>
        <ContentField/>
      </div>
    )
  }
}

export default ForgotPassword;