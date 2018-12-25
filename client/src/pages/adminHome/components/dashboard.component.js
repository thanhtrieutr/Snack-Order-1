import React from 'react';
import {Col, Panel} from 'react-bootstrap';

class DashboardComponent extends React.Component {
	render() {
		return (
			<Col xs={12} md={6}>
                <Panel bsStyle="primary" bsSize="large">
                    <Panel.Heading >
                        <Panel.Title bsSize="large" componentClass="h3" >{this.props.dataName}</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        {this.props.dataContent}
                    </Panel.Body>
                </Panel>
			</Col>
		);
	}
}

export default DashboardComponent;