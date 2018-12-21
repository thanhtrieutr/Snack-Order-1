import React from 'react';
import TitleBox from '../../components/Profile/title.box'
import SideBar from "./components/side.bar"
import ProfileContainer from './components/profile.container'
import '../../components/Profile/css/profile.css'
import {userInfo,changePassword} from "./script/user.info"
import {checkLogIn} from './script/token'
import {avatarHandler} from "./script/avatar"
import {getCurrentPassword,getAvatar,getNewPassword,getConfirmPassword} from "./script/get"
export const ProfileContext = React.createContext();
export class ProfileProvider extends React.Component {
	state = {
		avatar:"/static/images/default-avatar.png",
		user:"",
		passwordDetail: {
			currentPassword:"",
			newPassword:"",
			confirmPassword:""
		},
		getAvatar : getAvatar.bind(this),
		getCurrentPassword : getCurrentPassword.bind(this),
		getNewPassword : getNewPassword.bind(this),
		getConfirmPassword : getConfirmPassword.bind(this),
		userInfo : userInfo.bind(this),
		changePassword : changePassword.bind(this),
		avatarHandler : avatarHandler.bind(this),
	}
	componentWillMount() {
		debugger;
		checkLogIn(this.props.history,result => {
			this.setState({
				user:result
			});
			this.state.userInfo();
			debugger;
		});
	}
  	render() {
	  	return (
		<ProfileContext.Provider value={this.state}>
			{this.props.children}
		</ProfileContext.Provider>
	  	)
	}
  }
class Index extends React.Component {
	render() {
		return (
			<ProfileProvider>
				<div className="profile">
					<TitleBox></TitleBox>
					<div className="container">
						<SideBar history={this.props.history}></SideBar>
						<ProfileContainer history={this.props.history}></ProfileContainer>
					</div>
				</div>
			</ProfileProvider>
		)
	}
}

export default Index;