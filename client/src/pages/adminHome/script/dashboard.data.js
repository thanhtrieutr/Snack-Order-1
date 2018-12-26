import {getDashboardData} from './api'
import {displayPrice} from "../../../helpers/utilities/display.price"

export function dashboardData() {
    getDashboardData(result => {
        if (result !== false) {
            debugger;
            this.setState({
                orderCount:result.orderCount,
                budgetRequire:displayPrice(result.budgetRequire),
                currentSpending:displayPrice(result.currentSpending),
                mostBought:result.mostBought,
                monthSpend:displayPrice(result.monthSpend)
            })
        }
    })
}