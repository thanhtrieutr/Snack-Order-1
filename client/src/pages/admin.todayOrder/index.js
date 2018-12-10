import React from 'react';
import './style.scss';
import HeadTag from './components/HeadTag'
// import LinkAdminPage from '../../components/LinkAdminPage'
// import TitlePanel from './components/TitlePanel'
// import OrderField from './components/OrderField'
// import {Container, Columns} from 'react-bulma-components/full';
class AdminTodayOrder extends React.Component {
    render() {
        return (
            <div className="admin-today-order"> 
                <HeadTag></HeadTag>
                {/* <Container breakpoint="fullhd">
                    <Columns>
                        <Columns.Column size={2} id="nav-menu">
                            <LinkAdminPage activeMenuItem="today-order"/>
                        </Columns.Column>
                        
                        <Columns.Column size={10} id="body">
                            body
                            <TitlePanel/>
                            <OrderField/>
                        </Columns.Column>
                    </Columns> 
                </Container> */}
            </div>
        );
    }
}

export default AdminTodayOrder;