import { useEffect, useState } from "react";
import AdminService from "../../services/adminService";
import '../../assets/styles/user.css'
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/utils/header";
import Message from "../../components/utils/message";
import Loading from "../../components/utils/loading";
import Search from "../../components/utils/search";
import PageInfo from "../../components/utils/pageInfo";
import usePagination from "../../hooks/usePagination";
import Info from "../../components/utils/Info";

function AdminTransactionsManagement() {

    const [data, setData] = useState([]);
    const [message, setMessage] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

    const {
        pageSize, pageNumber, noOfPages, searchKey,
        onNextClick, onPrevClick, setNoOfPages, setNoOfRecords, setSearchKey, getPageInfo
    } = usePagination()


    const getTransactions = async () => {
        const response = await AdminService.getAllTransactions(pageNumber, pageSize, searchKey).then(
            (response) => {
                if (response.data.status === 'SUCCESS') {
                    setData(response.data.response.data)
                    setNoOfPages(response.data.response.totalNoOfPages)
                    setNoOfRecords(response.data.response.totalNoOfRecords)
                    return
                }
            },
            (error) => {
                setMessage({ status: "FAIL", text: "Failed to fetch all transactions: Try again later!" })
            }
        )
        setIsFetching(false);
    }

    useEffect(() => {
        getTransactions();
    }, [searchKey, pageNumber])

    return (
        <div className="user-panel">
            <Sidebar activeNavId={4} />
            <div className="user-content">
                <Header title="Transactions" />
                <Message message={message} />

                {(isFetching) && <Loading />}
                {(!isFetching) &&
                    <>
                        <div className="utils page">
                            <Search onChange={(val) => setSearchKey(val)} placeholder="Search transactions" />
                            <PageInfo info={getPageInfo()} onPrevClick={onPrevClick} onNextClick={onNextClick}
                                pageNumber={pageNumber} noOfPages={noOfPages}
                            />
                        </div>
                        {(data.length === 0) && <Info text={"No transactions found!"} />}
                        {(data.length !== 0) && (
                            <table>
                                <TransactionsTableHeader />
                                <TransactionsTableBody data={data} />
                            </table>
                        )}
                    </>
                }
            </div>
        </div>
    )
}

export default AdminTransactionsManagement;


function TransactionsTableHeader() {
    return (
        <tr>
            <th>Transaction Id</th> <th>Email</th>
            <th>Description</th> <th>Amount</th>
            <th>Category</th> <th>Date</th>
        </tr>
    )
}
function TransactionsTableBody({ data }) {
    return data.map((item) => {
        return (
            <tr key={item.transactionId}>
                <td>
                    <span>
                        {"T" + String(item.transactionId).padStart(5, '0')}
                    </span>
                </td>
                <td>{item.userEmail}</td>
                <td>{item.description || "-"}</td>
                <td>
                    {
                        item.transactionType === 1 ? "- " : "+ "
                    }
                    {item.amount}
                </td>
                <td>{item.categoryName}</td>
                <td>
                    {
                        new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })
                    }
                </td>
            </tr>
        )
    })
}