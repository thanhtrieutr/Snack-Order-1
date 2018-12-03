import React, {Component} from 'react'
import "./userLogInStyle.css";
import "../../helpers/bootstrap/build-column.css"
import "../../helpers/bootstrap/off-set.css"
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
            <div className="user-login">
                <LogoContainer></LogoContainer>
                <InputContainer></InputContainer>
            </div>
        )
    }
}