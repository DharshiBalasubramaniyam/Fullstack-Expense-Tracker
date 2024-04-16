import incomeImg from '../../assets/images/income.png'
import expenseImg from '../../assets/images/expense.png'
import cashInHandImg from '../../assets/images/cashInHand.png'
import transactionImg from '../../assets/images/transaction.png'

function DashboardDetailBox({ total_income, total_expense, cash_in_hand, no_of_transactions }) {

    return (
        <div className='details'>
            <Box amount={'Rs. ' + total_income} src={incomeImg} title="Income"/>
            <Box amount={'Rs. ' + total_expense} src={expenseImg} title="Expense"/>
            <Box amount={'Rs. ' + cash_in_hand} src={cashInHandImg} title="Cash in hand"/>
            <Box amount={no_of_transactions} src={transactionImg} title="No of transactions"/>
        </div>
    )
}

function Box({amount, src, title}) {
    return (
        <div>
            <div>
                <h2>{amount}</h2>
                <h4>{title}</h4>
            </div>
            <img src={src}/>
        </div>
    )
}

export default DashboardDetailBox;