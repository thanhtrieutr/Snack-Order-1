import React from 'react';
import {Helmet} from "react-helmet";
import LinkAdminPage from "../../components/LinkAdminPage/LinkAdminPage"
import NavBarAdmin from '../../components/NavBarAdmin/NavBarAdmin'
import "./style.scss"
import {Col,Grid} from 'react-bootstrap';
import MainContainer from "./components/main.container"
class AdminHome extends React.Component {
	render() {
		return (
			<div className="admin-home">
				<Helmet>
					<meta charSet="utf-8" />
					<title>Admin Home</title>
					<link rel="canonical" href="http://mysite.com/example" />
					<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"/>
            	</Helmet>
				<Grid>
                    <LinkAdminPage activeMenuItem="home"></LinkAdminPage>
					<Col xs={12} md={9} lg={10}>
						<NavBarAdmin activeMenuItem="home"></NavBarAdmin>
						<MainContainer></MainContainer>
      				</Col>
                </Grid>
			</div>
		);
	}
}

export default AdminHome;