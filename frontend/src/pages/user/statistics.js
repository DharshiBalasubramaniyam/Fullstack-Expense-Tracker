import { useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import IncomeVsExpenseChart from "../../components/userDashboard/incomeVsExpenseChart";
import Header from "../../components/utils/header";
import Message from "../../components/utils/message";
import Loading from '../../components/utils/loading';
import useExpenseVsIncomeSummary from '../../hooks/useExpenseVsIncomeSummary';
import Info from "../../components/utils/Info";

function UserStatistics() {
    const months = getMonths()
    const [data, isLoading, isError] = useExpenseVsIncomeSummary(months)

    return (
        <div className="user-panel">
            <Sidebar activeNavId={9} />
            <div className="user-content">
                <Header title="Statistics" />
                {(isLoading) && <Loading />}
                {(isError) && <Message message={{ status: "Fail", text: "Something went wrong. Please try again later!" }} />}
                {(isError) && <Info text="No data found!" />}
                {(!isError) && <IncomeVsExpenseChart data={data} /> }
            </div>
        </div>
    )
}

export default UserStatistics;

function getMonths() {
    const months = []
    const current_date = new Date()

    for (let i = 11; i >= 0; i--) {
        const date = new Date(current_date.getFullYear(), current_date.getMonth() - i, 1)
        months.push({
            id: date.getMonth() + 1,
            year: date.getFullYear(),
            monthName: date.toLocaleString('en-US', { month: 'long' })
        })
    }

    return months
}