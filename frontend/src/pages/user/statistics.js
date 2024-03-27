import { useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import IncomeVsExpenseChart from "../../components/userDashboard/incomeVsExpenseChart";
import Header from "../../components/utils/header";
import Message from "../../components/utils/message";

function UserStatistics() {
    const [message, setMessage] = useState(null)
    const months = getMonths()

    return (
        <div className="user-panel">
            <Sidebar activeNavId={9}/>
            <div className="user-content">
                <Header title="Statistics"/>
                <Message message={message}/>
                <div className='charts'>
                    <IncomeVsExpenseChart  setMessage={setMessage} months={months}/>
                </div>
                
            </div>
        </div>
    )
}

export default UserStatistics;

function getMonths() {
    const months = []
    const current_date = new Date()

    for (let i = 0; i <= 11; i++) {
        const date = new Date(current_date.getFullYear(), current_date.getMonth() - i, 1)
        months.push({
            id: date.getMonth() + 1,
            year: date.getFullYear(),
            monthName: date.toLocaleString('en-US', { month: 'long' })
        })
    }

    return months
}