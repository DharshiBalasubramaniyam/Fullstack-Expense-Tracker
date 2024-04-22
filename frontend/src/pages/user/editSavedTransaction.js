import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from '../../services/userService';
import TransactionTypeSelectWrapper from '../../components/userTransactions/transactionTypeSelectWrapper';
import Header from '../../components/utils/header';
import useCategories from '../../hooks/useCategories';
import Loading from '../../components/utils/loading';
import Info from '../../components/utils/Info';
import Container from '../../components/utils/Container';
import toast from 'react-hot-toast';
import SavedTransactionForm from '../../components/userTransactions/SavedTransactionForm';

const transactionTypes = [{ 'id': 1, 'name': 'Expense' }, { 'id': 2, 'name': 'Income' }]

function EditSavedTransaction() {
    const { transactionId } = useParams();
    const [transaction, setData] = useState({});
    const [categories, isFetching] = useCategories();
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [activeTransactionType, setTransactionType] = useState(2);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setFilteredCategories(categories.filter(cat => cat.transactionType.transactionTypeId === activeTransactionType));
    }, [categories, activeTransactionType])


    // to be edited transaction fetch
    async function getTransaction() {
        await UserService.getSavedTransactionById(transactionId).then(
            (response) => {
                if (response.data.status === "SUCCESS") {
                    setData(response.data.response)
                }
            },
            (error) => {
                error.response ?
                    toast.error(error.response.data.response)
                    :
                    toast.error("Failed to fetch transaction information: Try again later!")
            }
        )

    }

    useEffect(() => {
        getTransaction()
    }, [transactionId])

    useEffect(() => {
        setTransactionType(transaction.transactionTypeId)
    }, [transaction])

    // form submition controll
    const onSubmit = async (data) => {
        setIsSaving(true)
        await UserService.updateSavedTransaction(
            transaction.planId, data.category, data.amount, data.description, data.frequency, data.date, 
        ).then(
            (response) => {
                if (response.data.status === "SUCCESS") {
                    navigate("/user/savedTransactions", { state: { text: response.data.response } })
                    return
                }
            },
            (error) => {
                error.response ?
                    toast.error(error.response.data.response)
                    :
                    toast.error("Failed to edit transaction information: Try again later!")
            }
        );
        setIsSaving(false);
    }

    const onDelete = async (id) => {
        console.log(id)
        setIsDeleting(true)
        await UserService.deleteSavedTransaction(id).then(
            (response) => {
                if (response.data.status === "SUCCESS") {
                    navigate("/user/savedTransactions", { state: { text: response.data.response } })
                }
            },
            (error) => {
                error.response ?
                    toast.error(error.response.data.response)
                    :
                    toast.error("Failed to delete transaction: Try again later!")
            }
        )
        setIsDeleting(false)
    }

    return (
        <Container activeNavId={11}>
            <Header title="Edit Saved Transaction" />
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
                        <SavedTransactionForm
                            categories={filteredCategories}
                            onSubmit={onSubmit}
                            isDeleting={isDeleting}
                            isSaving={isSaving}
                            transaction={transaction}
                            onDelete={onDelete}
                        />
                    </>
                )
            }
        </Container>
    )
}

export default EditSavedTransaction;