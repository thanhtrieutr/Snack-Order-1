import React from 'react';
import {Grid} from 'react-bootstrap';
import DashboardComponent from './dashboard.component'

class MainContainer extends React.Component {
	render() {
		return (
			<div>
				<DashboardComponent dataName="Today's Order Count" dataContent="11" currency="Order"></DashboardComponent>
                <DashboardComponent dataName="Budget Requirement" dataContent="22" currency="VND"></DashboardComponent>
                <DashboardComponent dataName="Current Spending" dataContent="33" currency="VND"></DashboardComponent>
                <DashboardComponent dataName="Most Bought Item" dataContent="44" currency="Item"></DashboardComponent>
                <DashboardComponent dataName="Monthly Spending" dataContent="55" currency="VND"></DashboardComponent>
			</div>
			
		);
	}
}

export default MainContainer;