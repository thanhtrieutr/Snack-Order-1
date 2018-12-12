import React from 'react'
import Helmet from 'react-helmet'
import { Grid, Col } from 'react-bootstrap'
import Content from './components/Content'
import './create-user.css'

export default class AddNewUser extends React.Component {
    render() {
        return (
            <div className="admin-create-user">
                <Helmet>
                    <title>Admin | Create user</title>
                </Helmet>
                <Grid>
                    <Col xs={2}></Col>
                    <Content/>
                </Grid>
            </div>
        );
    }
}
