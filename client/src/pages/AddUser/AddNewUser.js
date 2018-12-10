

import React from 'react';
import '../admin.todayOrder/style.scss';
import Content from './components/Content';

class AdminTodayOrder extends React.Component {
    render() {
        return (
            <div className="admin-today-order"> 
                <Content/>
            </div>
        );
    }
}

export default AdminTodayOrder;