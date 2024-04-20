import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import UserService from '../../services/userService';
import TransactionForm from '../../components/userTransactions/transactionForm';
import TransactionTypeSelectWrapper from '../../components/userTransactions/transactionTypeSelectWrapper';
import Header from '../../components/utils/header';
import Message from '../../components/utils/message';
import Loading from '../../components/utils/loading';
import useCategories from '../../hooks/useCategories';
import Info from '../../components/utils/Info';
import Container from '../../components/utils/Container';
import toast, { Toaster } from 'react-hot-toast';

const transactionTypes = [{ 'id': 1, 'name': 'Expense' }, { 'id': 2, 'name': 'Income' }]

function NewTransaction() {

    const [categories, isFetching] = useCategories();
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [activeTransactionType, setTransactionType] = useState(1);
    const [isSaving, setIsSaving] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setFilteredCategories(categories.filter(cat => cat.transactionType.transactionTypeId === activeTransactionType));
    }, [categories, activeTransactionType])

    const onSubmit = async (data) => {
        setIsSaving(true)
        await UserService.add_transaction(
            AuthService.getCurrentUser().email, data.category, data.description, data.amount, data.date
        ).then(
            (response) => {
                if (response.data.status === "SUCCESS") {
                    navigate("/user/transactions", { state: { text: response.data.response } })
                }
            },
            (error) => {
                error.response ?
                    toast.error(error.response.data.response)
                    :
                    toast.error("Failed to add transaction: Try again later!" )
            }
        );
        setIsSaving(false);
    }


    return (
        <Container activeNavId={2}>
            <Header title="New Transaction" />
            <Toaster/>
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
                        <TransactionForm categories={filteredCategories} onSubmit={onSubmit} isSaving={isSaving} />
                    </>
                )
            }
        </Container>
    )
}

export default NewTransaction;