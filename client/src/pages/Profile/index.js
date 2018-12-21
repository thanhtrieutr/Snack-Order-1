import React from 'react';
import TitleBox from '../../components/Profile/title.box'
import SideBar from "./components/side.bar"
import ProfileContainer from './components/profile.container'
import '../../components/Profile/css/profile.css'
import {userInfo,uploadNewInfo} from "./script/user.info"
import {checkLogIn} from './script/token'
import {avatarHandler} from "./script/avatar"
import {getAddress,getAvatar,getBirthday,getName,getPhone} from "./script/get"
export const ProfileContext = React.createContext();
export class ProfileProvider extends React.Component {
	state = {
		avatar:"/static/images/default-avatar.png",
		user:"",
		userInfo: {
			phone:"a",
			name:"a",
			address:"a",
			birthday:"a"
		},
		getAvatar : getAvatar.bind(this),
		getAddress : getAddress.bind(this),
        getName : getName.bind(this),
        getPhone : getPhone.bind(this),
		getBirthday : getBirthday.bind(this),
		userInfo : userInfo.bind(this),
		uploadNewInfo : uploadNewInfo.bind(this),
		avatarHandler : avatarHandler.bind(this)
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