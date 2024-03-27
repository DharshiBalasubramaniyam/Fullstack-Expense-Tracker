import { useEffect, useState } from "react";
import UserService from "../services/userService";
import AuthService from "../services/auth.service";

function useExpenseVsIncomeSummary(months) {
    const [data, setData] = useState([]);
    const [message, setMessage] = useState("")
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
        const getData = async () => {
            const income_response = await UserService.getMonthlySummary(AuthService.getCurrentUser().email).then(
                (response) => {
                    if (response.data.status === "SUCCESS") {
                        generateData(response.data.response)
                    }
                },
                (error) => {
                    setMessage({ status: "FAIL", text: "Failed to fetch all details: Try again later!" })
                }
            )
            setIsFetching(false)
        }

        getData()
    }, [months])

    const generateData = (fetchedData) => {
        const finalData = months.map(({ id, monthName }) => {
            const monthData = fetchedData.find((t) => t.month === id)
            return {
                id, monthName,
                totalIncome: monthData ? monthData.total_income : 0,
                totalExpense: monthData ? monthData.total_expense : 0
            }
        })
        setData(finalData)
    }

    return [data, message, isFetching]
}

export default useExpenseVsIncomeSummary;