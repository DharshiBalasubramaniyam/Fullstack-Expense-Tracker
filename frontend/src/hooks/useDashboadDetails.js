import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/userService";

function useDashboadDetails(currentMonth) {
    const [total_income, setIncome] = useState(0)
    const [total_expense, setExpense] = useState(0)
    const [no_of_transactions, setTransactions] = useState(0)
    const cash_in_hand = total_income > total_expense ? Number((total_income - total_expense)?.toFixed(2)) : 0;
    const [message, setMessage] = useState(null)

    console.log(currentMonth.id, currentMonth.year)

    useEffect(() => {
        const calculation = async () => {
            const income_response = await UserService.getTotalIncomeOrExpense(AuthService.getCurrentUser().id, 2, currentMonth.id, currentMonth.year).then(
                (response) => {
                    if (response.data.status === "SUCCESS"){
                        setIncome(Number((response.data.response) ? response.data.response.toFixed(2) : 0))
                    }
                },
                (error) => {
                    setMessage({ status: "FAIL", text: "Failed to fetch all details: Try again later!" })
                }
            )
    
            const expense_response = await UserService.getTotalIncomeOrExpense(AuthService.getCurrentUser().id, 1, currentMonth.id, currentMonth.year).then(
                (response) => {
                    if (response.data.status === "SUCCESS"){
                        setExpense(Number((response.data.response) ? response.data.response.toFixed(2) : 0))
                    }
                },
                (error) => {
                    setMessage({ status: "FAIL", text: "Failed to fetch all details: Try again later!" })
                }
            )
    
            const no_response = await UserService.getTotalNoOfTransactions(AuthService.getCurrentUser().id, currentMonth.id, currentMonth.year).then(
                (response) => {
                    if (response.data.status === "SUCCESS"){
                        setTransactions(response.data.response)
                    }
                },
                (error) => {
                    setMessage({ status: "FAIL", text: "Failed to fetch all details: Try again later!" })
                }
            )

        }

        calculation()
    }, [currentMonth])

    return [total_income, total_expense, cash_in_hand, no_of_transactions, message]
}


export default useDashboadDetails;