import React from 'react';
import './style.scss'
import {Image, Button, Glyphicon, Dropdown, MenuItem, ButtonToolbar, Col, DropdownButton} from 'react-bootstrap';
import {withRouter} from "react-router";
import {API_ROOT} from '../../api-config';


var menuList=[
    {id:"home", href:"/admin", content:"Home page"},
    {id:"today-order", href:"/admin/today-order", content:"Today Order"},
    {id:"order-history", href:"/admin/history", content:"Order history"},
    {id:"users", href:"/admin/users", content:"Users"},
    {id:"products", href:"/admin/products", content:"Product list"},
    {id:"add-product", href:"/admin/product/add", content:"Add new product"},
    {id:"add-user", href:"/admin/user/add", content:"Create new user"}
];

var adminAccountName = 'default';
class  NavBarAdmin extends React.Component {
    constructor() {
        super();
        adminAccountName = localStorage.getItem("adminAccount");
        this.state = {
            windowHeight: undefined,
            windowWidth: undefined
        }
        this.handleResize = this.handleResize.bind(this);
        this.handleDisplayUser = this.handleDisplayUser.bind(this);
    }

    handleResize = () => {
        this.setState({
          windowHeight: window.innerHeight,
          windowWidth: window.innerWidth,
        });
    } 

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    render() {
        return (
            <ButtonToolbar className="admin-nav-bar">
                <Col xs={2} sm={2} mdHidden lgHidden>
                    <Dropdown id="admin-dropdown-hamburger" className="nav-item" key="1">
                        <Dropdown.Toggle noCaret bsSize="large">
                            <Glyphicon glyph="menu-hamburger" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {this.createMenuList(this.props.activeMenuItem)}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Image className="logo" src={`${API_ROOT}${'/static/images/logo.png'}`}></Image>
                <Col className="pull-right">
                    {this.handleDisplayUser}
                </Col>
            </ButtonToolbar>
        );
    }
    handleClick() {
        localStorage.setItem("adminAccount", "default");
        localStorage.setItem("token", "null");
    }
    
    handleDisplayUser(){
        var width = this.state.windowWidth;
        if (width < 992) return(
            <div>
                <Dropdown id="admin-dropdown-user" bsSize="large" className="nav-item" pullRight>
                    <Dropdown.Toggle noCaret bsSize="large">
                        <Glyphicon glyph="user"/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                        <MenuItem header>admin@gmail.com</MenuItem>
                        <MenuItem divider/>
                        <MenuItem eventKey="2">Log out</MenuItem>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
        else return (
            <div>
                <DropdownButton  bsSize="large" className="nav-item" id="admin-dropdown-logout" key="2" title={adminAccountName}>
                    <MenuItem eventKey="2.1" href="/admin/login" onClick={this.handleClick}>
                        Log Out
                    </MenuItem>
                </DropdownButton>
                <Button bsSize="large" className="nav-item">
                    <Glyphicon glyph="user"> </Glyphicon> 
                </Button>
            </div>
        );
    }

    createMenuList(activeId) {
        var push = (path) => {
            this.props.history.push(path);
        }
        var listItems = menuList.map((item,index) => {
            if (item.id === activeId) {
                return (
                    <MenuItem  eventKey={`1.${index}`} key={index} onClick={() => push(item.href)} active>
						{item.content}
					</MenuItem>
                );
            }
            return (
                <MenuItem eventKey={`1.${index}`} key={index} onClick={() => push(item.href)}>
                    {item.content}
                </MenuItem>
            );
        });
        return listItems;
    }
}

export default withRouter(NavBarAdmin);