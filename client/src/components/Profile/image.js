import React, { Component } from "react"; 

class Images extends Component {
    render(){
        return (
            <div className={this.props.container}>
                <img className={this.props.class} src={'http://127.0.0.1:3000'+ this.props.imgName} />
            </div>
        );
    }
}

export default Images;