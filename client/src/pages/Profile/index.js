import React from 'react';
import TitleBox from '../../components/Profile/title.box'
import SideBar from "./components/side.bar"
import ProfileContainer from './components/profile.container'
import '../../components/Profile/css/profile.scss'
import {userInfo,uploadNewInfo} from "./script/user.info"
import {checkLogIn} from './script/token'
import {avatarHandler} from "./script/avatar"
import {getAddress,getAvatar,getBirthday,getName,getPhone} from "./script/get"

class Index extends React.Component {
	constructor() {
		super();
		this.state = {
			avatar:"static/images/default-avatar.png",
			user:"",
			userInfo: {
				phone:"",
				name:"",
				address:"",
				birthday:""
			}
		}
		this.getAvatar = getAvatar.bind(this);
		this.getAddress = getAddress.bind(this);
        this.getName = getName.bind(this);
        this.getPhone = getPhone.bind(this);
		this.getBirthday = getBirthday.bind(this);
		this.userInfo = userInfo.bind(this);
		this.uploadNewInfo = uploadNewInfo.bind(this);
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
						history={this.props.history} userInfo={this.state.userInfo} getName={this.getName} 
						getAddress={this.getAddress} getBirthday={this.getBirthday} getPhone={this.getPhone}
						uploadNewInfo={this.uploadNewInfo}>
					</ProfileContainer>
				</div>
			</div>
		)
	}
}

export default Index;