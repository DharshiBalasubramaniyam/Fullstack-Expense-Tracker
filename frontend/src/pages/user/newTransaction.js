import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import UserService from '../../services/userService';
import TransactionForm from '../../components/userTransactions/transactionForm';
import Sidebar from '../../components/sidebar/sidebar';
import TransactionTypeSelectWrapper from '../../components/userTransactions/transactionTypeSelectWrapper';
import Header from '../../components/utils/header';
import Message from '../../components/utils/message';
import Loading from '../../components/utils/loading';
import useCategories from '../../hooks/useCategories';
import Info from '../../components/utils/Info';

const transactionTypes = [{ 'id': 1, 'name': 'Expense' }, { 'id': 2, 'name': 'Income' }]

function NewTransaction() {

    const [categories, category_response, isFetching] = useCategories();
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [activeTransactionType, setTransactionType] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        setMessage(category_response)
        setFilteredCategories(categories.filter(cat => cat.transactionType.transactionTypeId === activeTransactionType));
    }, [categories, activeTransactionType, category_response])

    const onSubmit = async (data) => {
        setIsLoading(true)
        const response = await UserService.add_transaction(
            AuthService.getCurrentUser().email, data.category, data.description, data.amount, data.date
        ).then(
            (response) => {
                if (response.data.status === "SUCCESS") {
                    navigate("/user/transactions", { state: { status: "SUCCESS", text: response.data.response } })
                    return
                }
                setMessage({ status: "FAIL", text: "Failed to add transaction: Try again later!" })
            },
            (error) => {
                error.response ?
                    setMessage({ status: "FAIL", text: error.response.data.response })
                    :
                    setMessage({ status: "FAIL", text: "Failed to add transaction: Try again later!" })
            }
        );
        setIsLoading(false);
    }


    return (
        <div className="user-panel">
            <Sidebar activeNavId={2} />
            <div className="user-content">
                <Header title="New Transaction" />
                <Message message={message} />
                {(isFetching) && <Loading />}
                {(!isFetching && categories.length === 0) && <Info text="No data found!" />}
                {
                    (!isFetching && categories.length !== 0) && (
                        <>
                            <TransactionTypeSelectWrapper
                                transactionTypes={transactionTypes}
                                setTransactionType={setTransactionType}
                                activeTransactionType={activeTransactionType}
                            />
                            <TransactionForm categories={filteredCategories} onSubmit={onSubmit} isLoading={isLoading} />
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default NewTransaction;