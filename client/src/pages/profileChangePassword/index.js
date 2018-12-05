import React from 'react';
import TitleBox from '../../components/Profile/title.box'
import SideBar from "./components/side.bar"
import ProfileContainer from './components/profile.container'
import '../../components/Profile/css/profile.scss'
import {userInfo,changePassword} from "./script/user.info"
import {checkLogIn} from './script/token'
import {avatarHandler} from "./script/avatar"
import {getCurrentPassword,getAvatar,getNewPassword,getConfirmPassword} from "./script/get"

class Index extends React.Component {
	constructor() {
		super();
		this.state = {
			avatar:"/static/images/default-avatar.png",
			user:"",
			passwordDetail: {
				currentPassword:"",
				newPassword:"",
				confirmPassword:""
			}
		}
		this.getAvatar = getAvatar.bind(this);
		this.getCurrentPassword = getCurrentPassword.bind(this);
		this.getNewPassword = getNewPassword.bind(this);
		this.getConfirmPassword = getConfirmPassword.bind(this);
		this.userInfo = userInfo.bind(this);
		this.changePassword = changePassword.bind(this);
		this.avatarHandler = avatarHandler.bind(this);
	}

	componentWillMount() {
		checkLogIn(this.props.history,result => {
			this.setState({
				user:result
			});
			this.userInfo();
		});
	}

	render() {
		return (
			<div className="profile">
				<TitleBox></TitleBox>
				<div className="container">
					<SideBar user={this.state.user} avatar={this.state.avatar} avatarHandler={this.avatarHandler} history={this.props.history}></SideBar>
					<ProfileContainer 
						history={this.props.history} passwordDetail={this.state.passwordDetail} getCurrentPassword={this.getCurrentPassword} 
						getNewPassword = {this.getNewPassword} getConfirmPassword = {this.getConfirmPassword} changePassword={this.changePassword}>
					</ProfileContainer>
				</div>
			</div>
		)
	}
}

export default Index;