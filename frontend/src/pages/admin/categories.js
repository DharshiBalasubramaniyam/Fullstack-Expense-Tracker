import { useEffect, useState } from "react";
import AdminService from "../../services/adminService";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/utils/header";
import Message from "../../components/utils/message";
import Loading from "../../components/utils/loading";
import useCategories from "../../hooks/useCategories";
import { useNavigate } from "react-router-dom";
import Error from "../../components/utils/error";

function AdminCategoriesManagement() {

    const [data, category_response, isFetching] = useCategories([])
    const [message, setMessage] = useState('');
    console.log(isFetching)

    useEffect(() => {
        setMessage(category_response)
    }, [category_response])

    const disableOrEnable = async (categoryId) => {
        const response = await AdminService.disableOrEnableCategory(categoryId).then(
            (response) => {
                if (response.data.status === 'SUCCESS') {
                    window.location.reload()
                    return
                }
                setMessage({ status: "FAIL", text: "Failed to update category: Try again later!" })
            },
            (error) => {
                error.response ?
                    setMessage({ status: "FAIL", text: error.response.data.response })
                    :
                    setMessage({ status: "FAIL", text: "Failed to update category: Try again later!" })
            }
        )
    }


    return (
        <div className="user-panel">
            <Sidebar activeNavId={6} />
            <div className="user-content">
                <Header title="Categories" />
                <Message message={message} />
                {
                    data.length === 0 && isFetching ? <Loading /> :
                        data.length === 0 && !isFetching ? <Error /> :
                            <table style={{marginTop: '25px'}}>
                                <CategoriesTableHeader />
                                <CategoriesTableBody data={data} disableOrEnable={disableOrEnable} />
                            </table>

                }
            </div>

        </div>
    )
}

export default AdminCategoriesManagement;

function CategoriesTableHeader() {
    return (
        <tr>
            <th>Category Id</th>
            <th>Category Name</th>
            <th>Type</th>
            <th>Enabled</th>
            <th>Action</th>
        </tr>
    )
}

function CategoriesTableBody({ data, disableOrEnable }) {

    const navigate = useNavigate();

    const onEditClick = (category) => {
        localStorage.setItem("categoryToEdit", JSON.stringify(category))
        navigate(`/admin/editCategory/${category.categoryId}`)
    }

    return (
        data.map((item) => {
            return (
                <tr key={item.categoryId}>

                    <td>{"C" + String(item.categoryId).padStart(5, '0')}</td>

                    <td>{item.categoryName}</td>

                    <td>{item.transactionType.transactionTypeName}</td>
                    {
                        item.enabled ? <td style={{ color: '#6aa412' }}>Enabled</td> : <td style={{ color: '#ff0000' }}>Disabled</td>
                    }

                    <td style={{ display: 'flex', gap: '5px' }}>
                        <button
                            onClick={() => onEditClick(item)}
                        >
                            Edit
                        </button>
                        {
                            (item.enabled) ?
                                (<button
                                    onClick={() => disableOrEnable(item.categoryId)}
                                    style={{ backgroundColor: '#ff0000' }}
                                >
                                    Disable
                                </button>)
                                :
                                (<button
                                    onClick={() => disableOrEnable(item.categoryId)}
                                    style={{ backgroundColor: '#6aa412' }}
                                >
                                    Enable
                                </button>)
                        }

                    </td>
                </tr>
            )
        })
    )
}