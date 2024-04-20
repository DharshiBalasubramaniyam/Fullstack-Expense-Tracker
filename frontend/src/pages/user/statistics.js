import IncomeVsExpenseChart from "../../components/userDashboard/incomeVsExpenseChart";
import Header from "../../components/utils/header";
import Loading from '../../components/utils/loading';
import useExpenseVsIncomeSummary from '../../hooks/useExpenseVsIncomeSummary';
import Info from "../../components/utils/Info";
import Container from "../../components/utils/Container";
import toast, { Toaster } from "react-hot-toast";

function UserStatistics() {
    const months = getMonths()
    const [data, isLoading, isError] = useExpenseVsIncomeSummary(months)

    return (
        <Container activeNavId={9}>
            <Header title="Statistics" />
            <Toaster/>
            {(isLoading) && <Loading />}
            {(isError) && toast.error("Failed to fetch information. Try again later!") }
            {(isError) && <Info text="No data found!" />}
            {(!isError) && <IncomeVsExpenseChart data={data} />}
        </Container>
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