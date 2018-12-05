import React, { Component } from "react"; 
import Image from "../../../components/Profile/image";
import Name from '../../../components/Profile/name';
import NavBar from './nav.bar';
import UploadImage from '../../../components/Profile/upload.image'

class ProfileContainer extends Component {
    render(){
        return (
            <div className="cl-xs-12 cl-md-3">
                <div className="profile-sidebar">
                    <Image imgName={this.props.avatar} container="profile-user-avatar" class="avatar"></Image>
                    <UploadImage avatarHandler={this.props.avatarHandler}></UploadImage>
                    <Name class="profile-username" name={this.props.user}></Name>
                    <NavBar class="profile-menu" history={this.props.history}></NavBar>
                </div>
            </div>
        );
    }
}

export default ProfileContainer;