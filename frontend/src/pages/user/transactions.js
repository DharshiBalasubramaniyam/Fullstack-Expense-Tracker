import { useEffect, useState } from 'react';
import UserService from '../../services/userService';
import AuthService from '../../services/auth.service';
import Sidebar from '../../components/sidebar/sidebar';
import Header from '../../components/utils/header';
import Message from '../../components/utils/message';
import Empty from '../../components/utils/empty';
import Loading from '../../components/utils/loading';
import Search from '../../components/utils/search';
import usePagination from '../../hooks/usePagination';
import PageInfo from '../../components/utils/pageInfo';
import TransactionList from '../../components/userTransactions/transactionList.js';
import { useLocation } from 'react-router-dom';


function Transactions() {

    const [userTransactions, setUserTransactions] = useState([]);
    const [message, setMessage] = useState(null)
    const [isFetching, setIsFetching] = useState(true);
    const [transactionType, setTransactionType] = useState('')
    const location = useLocation();
    const receivedMessage = location.state

    const {
        pageSize, pageNumber, noOfPages, sortField, sortDirec, searchKey,
        onNextClick, onPrevClick, setNoOfPages, setNoOfRecords, setSearchKey, getPageInfo
    } = usePagination('date')

    const getTransactions = async () => {
        const transaction_response = await UserService.get_transactions(AuthService.getCurrentUser().email, pageNumber,
            pageSize, searchKey, sortField, sortDirec, transactionType).then(
                (response) => {
                    if (response.data.status === "SUCCESS") {
                        console.log(response.data)
                        setUserTransactions(response.data.response.data)
                        setNoOfPages(response.data.response.totalNoOfPages)
                        setNoOfRecords(response.data.response.totalNoOfRecords)
                        return
                    }
                    setMessage({ status: "FAIL", text: "Failed to fetch all transactions: Try again later!" })
                },
                (error) => {
                    error.response ?
                        setMessage({ status: "FAIL", text: error.response.data.response })
                        :
                        setMessage({ status: "FAIL", text: "Failed to fetch all transactions: Try again later!" })
                }
            )
        setIsFetching(false)
    }

    useEffect(() => {
        getTransactions()
    }, [pageNumber, searchKey, transactionType, sortDirec, sortField])

    useEffect(() => {
        setMessage(receivedMessage)
        console.log(receivedMessage)
    }, [receivedMessage])

    return (
        <div className="user-panel">
            <Sidebar activeNavId={1} />
            <div className="user-content">
                <Header title="Transactions" />
                <Message message={message} />

                {
                    userTransactions.length === 0 && isFetching ? (
                        <Loading />
                    ) : (
                        <>
                            <div className='utils'>
                                <Filter
                                    setTransactionType={(val) => setTransactionType(val)}
                                />
                                <div className='page'>
                                    <Search onChange={(val) => setSearchKey(val)} placeholder="Search transactions" />
                                    <PageInfo info={getPageInfo()} onPrevClick={onPrevClick} onNextClick={onNextClick}
                                        pageNumber={pageNumber} noOfPages={noOfPages}
                                    />
                                </div>
                            </div>
                            {
                                (userTransactions.length === 0 && !isFetching) ? (
                                    <Empty />
                                ) : (

                                    <TransactionList
                                        list={userTransactions}
                                    />
                                )
                            }
                        </>
                    )

                }

            </div>
        </div>
    )
}

export default Transactions;


function Filter({ setTransactionType }) {
    return (
        <select onChange={(e) => setTransactionType(e.target.value)} style={{margin:'0 15px 0 0' }}>
            <option value="">All</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
        </select>
    )
}


