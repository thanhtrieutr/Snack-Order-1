import React from 'react';
import {Helmet}  from 'react-helmet';

class HeadTag extends React.Component {
    render() {
        return (
            <Helmet>
                <title>Login - Snack Order</title>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />   
            </Helmet>
        );
    }
}

export default HeadTag;