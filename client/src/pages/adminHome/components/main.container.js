import React from 'react';
// import {Grid} from 'react-bootstrap';
import DashboardComponent from './dashboard.component'
import {dashboardData} from "../script/dashboard.data"
class MainContainer extends React.Component {
	constructor() {
		super();
		this.state = {
			orderCount:0,
			budgetRequire:0,
			currentSpending:0,
			mostBought:"None",
			monthSpend:0
		}
		this.dashboardData = dashboardData.bind(this); 
	}

	componentWillMount() {
		this.dashboardData();
	}

	render() {
		return (
			<div className="home-content">
				<DashboardComponent dataName="Today's Order Count" dataContent={this.state.orderCount}></DashboardComponent>
                <DashboardComponent dataName="Budget Requirement" dataContent={this.state.budgetRequire}></DashboardComponent>
                <DashboardComponent dataName="Current Spending" dataContent={this.state.currentSpending}></DashboardComponent>
                <DashboardComponent dataName="Most Ordered Item In The Day" dataContent={this.state.mostBought}></DashboardComponent>
                <DashboardComponent dataName="Monthly Spending" dataContent={this.state.monthSpend}></DashboardComponent>
			</div>
			
		);
	}
}

export default MainContainer;