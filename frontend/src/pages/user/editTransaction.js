import {useEffect, useState} from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import AuthService from '../../services/auth.service';
import UserService from '../../services/userService';
import TransactionForm from '../../components/userTransactions/transactionForm';
import Sidebar from '../../components/sidebar/sidebar';
import TransactionTypeSelectWrapper from '../../components/userTransactions/transactionTypeSelectWrapper';
import Header from '../../components/utils/header';
import Message from '../../components/utils/message';
import useCategories from '../../hooks/useCategories';
import Loading from '../../components/utils/loading';
import Empty from '../../components/utils/empty';

const transactionTypes = [{ 'id': 1, 'name': 'Expense' }, { 'id': 2, 'name': 'Income' }]

function EditTransaction() {

    const {transactionId} = useParams();
    const [transaction, setData] = useState({});
    const [categories, category_response] = useCategories();
    const [isFetching, setIsFetching] = useState(true);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [activeTransactionType, setTransactionType] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        setIsFetching(true)
        setMessage(category_response)
        setFilteredCategories(categories.filter(cat => cat.transactionType.transactionTypeId === activeTransactionType));
    }, [categories, activeTransactionType])


    // to be edited transaction fetch
    async function getTransaction() {
        const category_response = await UserService.get_single_transaction(transactionId).then(
            (response) => {
                if (response.data.status === "SUCCESS"){
                    console.log(response.data)
                    setData(response.data.response)
                    return
                }
                setMessage({ status: "FAIL", text: "Failed to fetch transaction information: Try again later!" })
            },
            (error) => {
                error.response ? 
                    setMessage({ status: "FAIL", text: error.response.data.response })
                : 
                    setMessage({ status: "FAIL", text: "Failed to fetch transaction information: Try again later!" })            }
        )

    }

    useEffect(()=>{
        getTransaction()
    }, [transactionId])

    useEffect(()=>{
        setTransactionType(transaction.transactionType)
    }, [transaction])

    // form submition controll
    const onSubmit = async (data) => {
        setIsLoading(true)        
        const response = await UserService.update_transaction(
            transactionId,AuthService.getCurrentUser().email, data.category, data.description, data.amount, data.date
        ).then(
            (response) => {
                if (response.data.status === "SUCCESS"){
                    navigate("/user/transactions", {state: { status: "SUCCESS", text: response.data.response }})
                    return
                }
                setMessage({ status: "FAIL", text: "Failed to edit transaction information: Try again later!" })
            },
            (error) => {
                error.response ? 
                    setMessage({ status: "FAIL", text: error.response.data.response })
                : 
                    setMessage({ status: "FAIL", text: "Failed to edit transaction information: Try again later!" })
            }
          );
        setIsLoading(false);
    }

    const onDelete = (id) => {
        setIsLoading(true)
        const delete_response = UserService.delete_transaction(id).then(
            (response) => {
                console.log(response);
                if (response.data.status === "SUCCESS") {
                    window.location.reload()
                    setMessage({ status: "SUCCESS", text: response.data.response })
                    return
                }
                setMessage({ status: "FAIL", text: "Failed to delete transaction: Try again later!" })
            },
            (error) => {
                error.response ?
                    setMessage({ status: "FAIL", text: error.response.data.response })
                    :
                    setMessage({ status: "FAIL", text: "Failed to delete transaction: Try again later!" })
            }
        )
        setIsLoading(false)
    }

    return(
        <div className="user-panel">
            <Sidebar activeNavId={1}/>
            <div className="user-content">
                <Header title="Edit Transaction"/>
                <Message message={message}/>

                {
                    (categories.length === 0 && isFetching) ? (
                        <Loading />
                    ) : (
                        (categories.length === 0 && !isFetching) ? (
                            <Empty />
                        ) : (
                            <>
                                <TransactionTypeSelectWrapper
                                    transactionTypes={transactionTypes}
                                    setTransactionType={setTransactionType}
                                    activeTransactionType={activeTransactionType}
                                />
                                <TransactionForm 
                                categories={filteredCategories} 
                                onSubmit={onSubmit} 
                                isLoading={isLoading} 
                                transaction={transaction}
                                onDelete={onDelete}
                                />
                            </>
                        )
                    )
                }

            </div>
        </div>
    )
}

export default EditTransaction;