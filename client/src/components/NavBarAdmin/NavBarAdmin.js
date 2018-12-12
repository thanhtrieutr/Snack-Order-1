import React from 'react';
import './style.scss'
import {Button, Media, Glyphicon, Dropdown, MenuItem, ButtonToolbar, Col, DropdownButton, Well} from 'react-bootstrap';

var menuList=[
    {id:"home", href:"/admin", content:"Home page"},
    {id:"today-order", href:"/admin/today-order", content:"Today Order"},
    {id:"order-history", href:"/admin/history", content:"Order history"},
    {id:"users", href:"/admin/users", content:"Users"},
    {id:"products", href:"/admin/products", content:"Product list"},
    {id:"add-product", href:"/admin/product/add", content:"Add new product"},
    {id:"add-user", href:"/admin/user/add", content:"Create new user"}
];
var adminAccountName = "default";

class  NavBarAdmin extends React.Component {
    constructor() {
        super();
        adminAccountName = localStorage.getItem("adminAccount");
    }
    render() {
        return (
        <ButtonToolbar>
            <Col xs={2} sm={2} mdHidden lgHidden>
            <Dropdown id="admin-dropdown-hamburger" key="1">
                <Dropdown.Toggle noCaret>
                    <Glyphicon glyph="menu-hamburger" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {this.createMenuList(this.props.activeMenuItem)}
                </Dropdown.Menu>
            </Dropdown>
            </Col>

            <Col className="pull-right">
            <DropdownButton  bsSize="large" id="admin-dropdown-logout" key="2" title={adminAccountName}>
                <MenuItem eventKey="2.1" href="/admin/login" onClick={this.handleClick}>
                    Log Out
                </MenuItem>
            </DropdownButton>
            <Button bsSize="large">
                <Glyphicon glyph="user"> </Glyphicon> 
            </Button>
            </Col>
        </ButtonToolbar>
        );
    }
    handleClick() {
        localStorage.setItem("adminAccount", "default");
        localStorage.setItem("token", "null");
    }
    createMenuList(activeId) {
        var listItems = menuList.map((item,index) => {
            if (item.id === activeId) {
                return (
                    <MenuItem key={index}  eventKey={`1.${index}`} href={item.href} active>
						{item.content}
					</MenuItem>
                );
            }
            return (
                <MenuItem key={index} eventKey={`1.${index}`} href={item.href}>
                    {item.content}
                </MenuItem>
            );
        });
        return listItems;
    }
}

export default NavBarAdmin;