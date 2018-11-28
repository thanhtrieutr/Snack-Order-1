import React, { Component } from "react"; 
import Image from "./image";

class TitleBox extends Component {
    render(){
        return (
            <div className="title cl-xs-12">
                <Image imgName="/static/images/logo.png" container="logo-container" class="logo"></Image>
            </div>
        );
    }
}

export default TitleBox;