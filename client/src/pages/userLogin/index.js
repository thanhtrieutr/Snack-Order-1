import React, {Component} from 'react'
import "./userLogInStyle.scss";
import "./components/InputContainer";
import "./components/LogoContainer";
import LogoContainer from './components/LogoContainer';
import InputContainer from './components/InputContainer';

export default class UserLogin extends Component {
    constructor() {
        super();
    }
    render() {
        return( 
            <div className="user-login" xs={12} md={8}>
                <LogoContainer></LogoContainer>
                <InputContainer></InputContainer>
            </div>
        )
    }
}