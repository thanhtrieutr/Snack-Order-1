import {getDashboardData} from './api'

export function dashboardData() {
    getDashboardData(result => {
        if (result !== false) {
            this.setState({
                orderCount:result.orderCount,
                budgetRequire:result.budgetRequire,
                currentSpending:result.currentSpending,
                mostBought:result.mostBought,
                monthSpend:result.monthSpend
            })
        }
    })
}