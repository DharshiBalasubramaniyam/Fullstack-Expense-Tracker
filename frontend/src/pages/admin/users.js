import { useEffect, useState } from "react";
import AdminService from "../../services/adminService"
import Header from "../../components/utils/header";
import Loading from "../../components/utils/loading";
import usePagination from "../../hooks/usePagination";
import Search from "../../components/utils/search";
import PageInfo from "../../components/utils/pageInfo";
import Info from "../../components/utils/Info";
import Container from "../../components/utils/Container";
import toast, { Toaster } from "react-hot-toast";

function AdminUsersManagement() {

    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    const {
        pageSize, pageNumber, noOfPages, searchKey,
        onNextClick, onPrevClick, setNoOfPages, setNoOfRecords, setSearchKey, getPageInfo
    } = usePagination()

    const getUsers = async () => {
        await AdminService.getAllUsers(pageNumber, pageSize, searchKey).then(
            (response) => {
                if (response.data.status === 'SUCCESS') {
                    setData(response.data.response.data)
                    setNoOfPages(response.data.response.totalNoOfPages)
                    setNoOfRecords(response.data.response.totalNoOfRecords)
                    return
                }
                toast.error("Failed to fetch all users: Try again later!")
            },
            (error) => {
                toast.error("Failed to fetch all users: Try again later!")
            }
        )
        setIsFetching(false)
    }

    const disableOrEnable = async (userId) => {
        await AdminService.disableOrEnableUser(userId).then(
            (response) => {
                if (response.data.status === 'SUCCESS') {
                    window.location.reload()
                    return
                }
                toast.error("Failed to update user: Try again later!")
            },
            (error) => {
                toast.error("Failed to update user: Try again later!")
            }
        )
    }

    useEffect(() => {
        getUsers();
    }, [searchKey, pageNumber])

    return (
        <Container activeNavId={5}>
            <Header title="Users" />
            <Toaster/>

            {(isFetching) && <Loading />}
            {(!isFetching) &&
                <>
                    <div className="utils page">
                        <Search onChange={(val) => setSearchKey(val)} placeholder="Search users" />
                        <PageInfo info={getPageInfo()} onPrevClick={onPrevClick} onNextClick={onNextClick}
                            pageNumber={pageNumber} noOfPages={noOfPages}
                        />
                    </div>
                    {(data.length === 0) && <Info text={"No transactions found!"} />}
                    {(data.length !== 0) && (
                        <table>
                            <UsersTableHeader />
                            <UsersTableBody data={data} disableOrEnable={disableOrEnable} />
                        </table>
                    )}
                </>
            }
        </Container>
    )
}

export default AdminUsersManagement;


function UsersTableHeader() {
    return (
        <tr>
            <th>User Id</th> <th>Username</th> <th>Email</th>
            <th>Tot. Expense(Rs.)</th> <th>Tot. Income(Rs.)</th>
            <th>Tot. No. Transactions</th> <th>Status</th> <th>Action</th>
        </tr>
    )
}

function UsersTableBody({ data, disableOrEnable }) {
    return (
        data.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{"U" + String(item.id).padStart(5, '0')}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>Rs. {item.expense || 0.0}</td>
                    <td>Rs. {item.income || 0.0}</td>
                    <td>{item.noOfTransactions || 0}</td>
                    {
                        item.enabled ? <td style={{ color: '#6aa412' }}>Enabled</td> : <td style={{ color: '#ff0000' }}>Disabled</td>
                    }

                    <td>
                        {
                            (item.enabled) ?
                                <button
                                    onClick={() => disableOrEnable(item.id)}
                                    style={{ backgroundColor: '#ff0000' }}
                                >Disable
                                </button> :
                                <button
                                    onClick={() => disableOrEnable(item.id)}
                                    style={{ backgroundColor: '#6aa412' }}
                                >Enable
                                </button>
                        }
                    </td>
                </tr>
            )
        })
    )
}