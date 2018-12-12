import React from 'react'
import Helmet from 'react-helmet'
import { Grid, Col } from 'react-bootstrap'
import Content from './components/Content'

export default class ProductList extends React.Component {
    render() {
        return (
            <div className="admin-product">
                <Helmet>
                    <title>Admin | Product List</title>
                </Helmet>
                <Grid>
                    <Col xs={2}></Col>
                    <Content/>
                </Grid>
            </div>
        );
    }
}
