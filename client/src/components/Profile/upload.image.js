import React, { Component } from "react"; 

class UploadImage extends Component {
    render(){
        return (
            <form id="image-upload" encType="multipart/form-data" method="POST">
                <input onChange={this.props.avatarHandler} type="file" id="avatar-input-field"/>
            </form>
        );
    }
}

export default UploadImage;