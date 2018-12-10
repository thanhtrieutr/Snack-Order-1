

import React from 'react';
import '../admin.todayOrder/style.scss';
import HeadTag from '../admin.Login/components/HeadTag'
// import LinkAdminPage from '../../components/LinkAdminPage'
// import TitlePanel from '../admin.todayOrder/components/TitlePanel'
// import Content from './components/Content';
// import {Container, Columns} from 'react-bulma-components/full';
class AdminTodayOrder extends React.Component {
    render() {
        return (
            <div className="admin-today-order"> 
                <HeadTag></HeadTag>
                
            </div>
        );
    }
}

export default AdminTodayOrder;