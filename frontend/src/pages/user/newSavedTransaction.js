import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/userService';
import TransactionTypeSelectWrapper from '../../components/userTransactions/transactionTypeSelectWrapper';
import Header from '../../components/utils/header';
import Loading from '../../components/utils/loading';
import useCategories from '../../hooks/useCategories';
import Info from '../../components/utils/Info';
import Container from '../../components/utils/Container';
import toast, { Toaster } from 'react-hot-toast';
import SavedTransactionForm from '../../components/userTransactions/SavedTransactionForm';

const transactionTypes = [{ 'id': 1, 'name': 'Expense' }, { 'id': 2, 'name': 'Income' }]

function NewSavedTransaction() {
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
        await UserService.createSavedTransaction(
            data.category, data.amount, data.description, data.frequency, data.date, 
        ).then(
            (response) => {
                if (response.data.status === "SUCCESS") {
                    navigate("/user/savedTransactions", { state: { text: response.data.response } })
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
        <Container activeNavId={11}>
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
                        <SavedTransactionForm categories={filteredCategories} onSubmit={onSubmit} isSaving={isSaving} />
                    </>
                )
            }
        </Container>
    )
}

export default NewSavedTransaction;


