

import React from 'react';
import '../admin.todayOrder/style.scss';
import HeadTag from '../admin.Login/components/HeadTag'
import Content from './components/Content';

class AdminTodayOrder extends React.Component {
    render() {
        return (
            <div className="admin-today-order"> 
                <HeadTag></HeadTag>
                <Content/>
            </div>
        );
    }
}

export default AdminTodayOrder;