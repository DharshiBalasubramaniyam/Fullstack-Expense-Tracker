import { useEffect, useState } from "react";
import AdminService from "../../services/adminService";
import '../../assets/styles/user.css'
import Header from "../../components/utils/header";
import Loading from "../../components/utils/loading";
import Search from "../../components/utils/search";
import PageInfo from "../../components/utils/pageInfo";
import usePagination from "../../hooks/usePagination";
import Info from "../../components/utils/Info";
import Container from "../../components/utils/Container";
import toast, { Toaster } from "react-hot-toast";

function AdminTransactionsManagement() {

    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    const {
        pageSize, pageNumber, noOfPages, searchKey,
        onNextClick, onPrevClick, setNoOfPages, setNoOfRecords, setSearchKey, getPageInfo
    } = usePagination()


    const getTransactions = async () => {
        await AdminService.getAllTransactions(pageNumber, pageSize, searchKey).then(
            (response) => {
                if (response.data.status === 'SUCCESS') {
                    setData(response.data.response.data)
                    setNoOfPages(response.data.response.totalNoOfPages)
                    setNoOfRecords(response.data.response.totalNoOfRecords)
                    return
                }
            },
            (error) => {
                toast.error("Failed to fetch all transactions: Try again later!")
            }
        )
        setIsFetching(false);
    }

    useEffect(() => {
        getTransactions();
    }, [searchKey, pageNumber])

    return (
        <Container activeNavId={4}>
            <Header title="Transactions" />
            <Toaster/>
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
        </Container>
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