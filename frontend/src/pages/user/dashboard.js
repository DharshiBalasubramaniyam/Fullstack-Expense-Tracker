import '../../assets/styles/dashboard.css';
import { useState } from 'react';
import DashboardDetailBox from '../../components/userDashboard/dashboardDetailBox';
import CategoryExpenseChart from '../../components/userDashboard/categoryExpenseChart';
import Header from '../../components/utils/header';
import Budget from '../../components/userDashboard/budget';
import useDashboard from '../../hooks/useDashboard';
import Loading from '../../components/utils/loading';
import Info from '../../components/utils/Info';
import Container from '../../components/utils/Container';
import toast, { Toaster } from 'react-hot-toast';

function Dashboard() {

    const months = getMonths()
    const [currentMonth, setMonth] = useState(months[0])

    const [total_expense, total_income, cash_in_hand, no_of_transactions, categorySummary, budgetAmount,
        saveBudget, isLoading, isError] = useDashboard(currentMonth)

    const onMonthChange = (id) => {
        const month = months.find(m => m.id == id)
        setMonth(month)
    }

    return (
        <Container activeNavId={0}>
            <Header title="Dashboard" />
            <Toaster/>
            {(isLoading) && <Loading />}
            {(isError) && toast.error("Failed to fetch information. Try again later!")}
            {(!isError) && <SelectMonth months={months} onMonthChange={onMonthChange} />}
            {(!isLoading &&  total_expense === 0) && <Info text={"You have no expenses in this month!"} />}
            {
                (!isError && total_expense !== 0) && <>
                    <DashboardDetailBox total_expense={total_expense} total_income={total_income} cash_in_hand={cash_in_hand} no_of_transactions={no_of_transactions} />
                    <div className='dashboard-chart'>
                        <CategoryExpenseChart categorySummary={categorySummary} />
                        <Budget totalExpense={total_expense} budgetAmount={budgetAmount} saveBudget={saveBudget} currentMonth={currentMonth} />
                    </div>
                </>
            }
        </Container>

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

function SelectMonth({ months, onMonthChange }) {
    return (
        <div>
            <select onChange={(e) => onMonthChange(e.target.value)}>
                {
                    months.map((m) => {
                        return (
                            <option value={m.id} key={m.id}>{m.monthName} {m.year}</option>
                        )
                    })
                }
            </select>
        </div>
    )
}