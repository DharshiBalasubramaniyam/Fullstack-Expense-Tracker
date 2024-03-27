import '../../assets/styles/transactionList.css'
import { Link } from 'react-router-dom';

function TransactionList({ list }) {

    return (
        <>
            {
                Object.keys(list).map((date) => (
                    <div className='t-box' key={date}>
                        <div className='date'>{formatDate(date)}</div>
                        <div className='t-list'>
                            {
                                list[date].map(t => (
                                    <Link to={`/user/editTransaction/${t.transactionId}`} className='t-row' key={t.transactionId}>
                                            <div className='t-row-left'>
                                                <p>{t.categoryName}</p>
                                                <p>{t.description}</p>
                                            </div>
                                            <div className='t-row-right'>
                                                <p> {
                                                        t.transactionType === 1 ? "- " : "+ "
                                                    }
                                                    Rs. {t.amount}</p>
                                            </div>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                ))
            }

        </>
    )
}

function formatDate(dateString) {
    if (["Today", "Yesterday"].includes(dateString)) {
        return dateString
    }
    const date = new Date(dateString)
    const y = date.getFullYear()
    const m = date.toLocaleDateString('en-US', { month: 'long' })
    const d = date.getDate()
    return d + " " + m + " " + y;
}
export default TransactionList;
