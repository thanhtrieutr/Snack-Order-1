import React, { Component } from "react"; 
import Image from "../../../components/Profile/image";
import Name from '../../../components/Profile/name';
import NavBar from './nav.bar';
import UploadImage from '../../../components/Profile/upload.image'
import {ProfileContext} from "../index";
class ProfileContainer extends Component {
    render(){
        return (
            <ProfileContext.Consumer>
                {(context) => {
                    return (
                        <div className="cl-xs-12 cl-md-3">
                            <div className="profile-sidebar">
                                <Image imgName={context.avatar} container="profile-user-avatar" class="avatar"></Image>
                                <UploadImage avatarHandler={context.avatarHandler}></UploadImage>
                                <Name class="profile-username" name={context.user}></Name>
                                <NavBar class="profile-menu" history={this.props.history}></NavBar>
                            </div>
                        </div>
                    )
                }}
            </ProfileContext.Consumer>
        );
    }
}

export default ProfileContainer;