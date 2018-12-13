import React from 'react';
// import {Grid} from 'react-bootstrap';
import DashboardComponent from './dashboard.component'

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
	}

	componentWillMount() {
		var item={
			token:localStorage.getItem("token")
		};
		//Call API get all the content.
	}

	render() {
		return (
			<div className="home-content">
				<DashboardComponent dataName="Today's Order Count" dataContent={this.state.orderCount} currency="Order"></DashboardComponent>
                <DashboardComponent dataName="Budget Requirement" dataContent={this.state.budgetRequire} currency="VND"></DashboardComponent>
                <DashboardComponent dataName="Current Spending" dataContent={this.state.currentSpending} currency="VND"></DashboardComponent>
                <DashboardComponent dataName="Most Bought Item" dataContent={this.state.mostBought} currency="Item"></DashboardComponent>
                <DashboardComponent dataName="Monthly Spending" dataContent={this.state.monthSpend} currency="VND"></DashboardComponent>
			</div>
			
		);
	}
}

export default MainContainer;