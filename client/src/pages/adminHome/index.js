import React from 'react';
import {Col} from 'react-bootstrap';
import {Helmet} from "react-helmet";
import LinkAdminPage from "../../components/LinkAdminPage"
class AdminHome extends React.Component {
	render() {
		return (
			<div>
				<Helmet>
					<meta charSet="utf-8" />
					<title>My Title</title>
					<link rel="canonical" href="http://mysite.com/example" />
					<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"/>
            	</Helmet>
				<Col xs={0} md={2}>
					<LinkAdminPage activeMenuItem="home"></LinkAdminPage>
				</Col>
			</div>
		);
	}
}

export default AdminHome;