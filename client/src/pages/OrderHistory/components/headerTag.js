import React from 'react';
import {Helmet}  from 'react-helmet';

class HeaderTag extends React.Component {
    render() {
        return (
            <Helmet>
                <title> Order History</title>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />   
            </Helmet>
        );
    }
}

export default HeaderTag;