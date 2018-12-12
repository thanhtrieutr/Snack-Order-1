import React from 'react';
import {Helmet} from "react-helmet";
import LinkAdminPage from "../../components/LinkAdminPage/LinkAdminPage"
import NavBarAdmin from '../../components/NavBarAdmin/NavBarAdmin'
import "./style.scss"
import {Col} from 'react-bootstrap';
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
				<NavBarAdmin activeMenuItem="home"></NavBarAdmin>
				<LinkAdminPage activeMenuItem="home"></LinkAdminPage>
				<MainContainer></MainContainer>
			</div>
		);
	}
}

export default AdminHome;