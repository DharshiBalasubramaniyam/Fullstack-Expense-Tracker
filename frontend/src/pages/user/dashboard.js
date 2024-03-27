import '../../assets/styles/dashboard.css';
import { useState } from 'react';
import DashboardDetailBox from '../../components/userDashboard/dashboardDetailBox';
import CategoryExpenseChart from '../../components/userDashboard/categoryExpenseChart';
import Header from '../../components/utils/header';
import Message from '../../components/utils/message';
import Sidebar from '../../components/sidebar/sidebar';

function Dashboard() {

    const [message, setMessage] = useState(null)
    const months = getMonths()
    const [currentMonth, setMonth] = useState(months[0])

    const onMonthChange = (id) => {
        const month = months.find(m => m.id==id)
        setMonth(month)
        console.log(currentMonth)
    }
      
    return(
        <div className="user-panel">
            <Sidebar activeNavId={0}/>
            <div className="user-content">
                <Header title="Dashboard"/>
                <Message message={message}/>
                <div>
                    <select onChange={(e) => onMonthChange(e.target.value)}>
                        {
                            months.map((m) => {
                                return (
                                    <option value={m.id}>{m.monthName} {m.year}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <DashboardDetailBox setMessage={setMessage} currentMonth={currentMonth}/>
                <div className='charts'>
                    <CategoryExpenseChart setMessage={setMessage} currentMonth={currentMonth}/>
                </div>
                
            </div>
        </div>
        
    )
}

export default Dashboard;

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

    return months;
}