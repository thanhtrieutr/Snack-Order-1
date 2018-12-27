import React from 'react';
import {Nav, NavItem, Col} from 'react-bootstrap';
import { withRouter } from "react-router";
var menuList=[
    {id:"home", href:"/admin", content:"Home page"},
    {id:"today-order", href:"/admin/today-order", content:"Today Order"},
    {id:"order-history", href:"/admin/history", content:"Order history"},
    {id:"users", href:"/admin/users", content:"Users"},
    {id:"add-user", href:"/admin/user/add", content:"Create new user"},
    {id:"products", href:"/admin/products", content:"Product list"},
    {id:"add-product", href:"/admin/product/add", content:"Add new product"}
];

class LinkAdminPage extends React.Component {
    render() {
        return (
            <Col xsHidden smHidden md={3} lg={2}>
                <Nav bsStyle="pills" stacked >
                    {this.createMenuList(this.props.activeMenuItem)}
                </Nav>        
            </Col>
        );
    }
    createMenuList(activeId) {
        var push = (path) => {
            this.props.history.push(path);
        }
        var listItems = menuList.map(item => {
            if (item.id === activeId) {
                return (
                    <NavItem id={item.id} key={item.id} eventKey={1} onClick={() => push(item.href)} active>
						{item.content}
					</NavItem>
                );
            }
            return (
                <NavItem id={item.id} key={item.id} eventKey={1} onClick={() => push(item.href)}>
                    {item.content}
                </NavItem>
            );
        });
        return listItems;
    }
}

export default withRouter(LinkAdminPage);