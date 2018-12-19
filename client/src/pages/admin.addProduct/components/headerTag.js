import React from 'react';
import {Helmet}  from 'react-helmet';

class HeaderTag extends React.Component {
    render() {
        return (
            <Helmet>
                <title> Add Product</title>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />   
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"/>
            </Helmet>
        );
    }
}

export default HeaderTag;