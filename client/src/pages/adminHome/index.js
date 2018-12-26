import React from 'react';
import {Helmet} from "react-helmet";
import LinkAdminPage from "../../components/LinkAdminPage/LinkAdminPage"
import NavBarAdmin from '../../components/NavBarAdmin/NavBarAdmin'
import "./style.scss"
import {Col,Grid} from 'react-bootstrap';
import MainContainer from "./components/main.container"
import {checkToken} from "../../helpers/api/adminApi/check-token"
import {errorAlert} from "../../helpers/utilities/alert"
class AdminHome extends React.Component {
	constructor() {
		super();
		this.state = {
			trueUser:false
		}
	}
	render() {
		return (
			<div className="admin-home">
				<Helmet>
					<meta charSet="utf-8" />
					<title>Admin Home</title>
					<link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
				<Grid>
					<NavBarAdmin activeMenuItem="home"></NavBarAdmin>
          <LinkAdminPage activeMenuItem="home"></LinkAdminPage>
					<Col xs={12} md={9} lg={10}>
						{!this.state.trueUser ? null :
						<MainContainer></MainContainer> }
      		</Col>
        </Grid>
			</div>
		);
	}

	componentWillMount() {
		var item={
			token:localStorage.getItem("token")
		};
		checkToken(item,result => {
			if (result === false) {
				errorAlert("You haven't logged in");
				this.props.history.push("/admin/login");
			}
			else {
				this.setState({
					trueUser:true
				})
			}
		});
	}
	
	handleResize = () => {
		this.setState({
		  windowHeight: window.innerHeight,
		  windowWidth: window.innerWidth
		});
	} 
	componentDidMount() {
	window.addEventListener('resize', this.handleResize);
	}

	componentWillUnmount() {
	window.removeEventListener('resize', this.handleResize);
	}
}

export default AdminHome;
