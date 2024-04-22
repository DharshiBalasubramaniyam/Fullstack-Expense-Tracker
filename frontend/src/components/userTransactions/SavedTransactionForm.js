import { useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function SavedTransactionForm({categories, onSubmit, isDeleting, isSaving, transaction, onDelete}) {
    const { register, handleSubmit, watch, reset, formState } = useForm();
    const date = useRef({});
    date.current = watch('date');
    const navigate = useNavigate()

    useEffect(() => {
        if (transaction && transaction.planId) {
            reset({
                category: String(transaction.categoryId),
                frequency: transaction.frequency,
                description: transaction.description,
                amount: transaction.amount,
                date: transaction.upcomingDate.split('T')[0]
            })
        }
    }, [reset, transaction])

    const deleteTransaction = (e, id) => {
        e.preventDefault()
        onDelete(id)
    }

    const cancelProcess = (e) => {
        e.preventDefault()
        navigate("/user/savedTransactions")
    }


    return (
        <form className="auth-form t-form" onSubmit={handleSubmit(onSubmit)}>

            <div className='input-box'>

                {/* input category */}
                <label>Transaction Category</label><br />
                <div className='radio'>

                    {
                        categories.filter(cat => cat.enabled).map((cat) => {
                            return (
                                <span key={cat.categoryId}>
                                    <input
                                        type='radio'
                                        id={cat.categoryName}
                                        value={cat.categoryId}
                                        {...register('category', {
                                            required: "category is required"
                                        })}
                                    /><label for={cat.categoryName}>{cat.categoryName}</label>
                                </span>
                            )
                        })
                    }

                </div>
                {formState.errors.category && <small>{formState.errors.category.message}</small>}
            </div>

            {/* input description */}
            <div className='input-box'>
                <label>Transaction description</label><br />
                <input
                    type='text'
                    {...register('description', {
                        maxLength: {
                            value: 50,
                            message: "Description can have atmost 50 characters!"
                        }
                    })}
                />
                {formState.errors.description && <small>{formState.errors.description.message}</small>}
            </div>

            {/* input amount */}
            <div className='input-box'>
                <label>Amount</label><br />
                <input
                    type='text'
                    {...register('amount', {
                        required: "Amount is required!",
                        pattern: { value: /^[0-9.]{1,}$/g, message: "Invalid amount!" }
                    })}
                />
                {formState.errors.amount && <small>{formState.errors.amount.message}</small>}
            </div>

            {/* input frequency */}
            <div className='input-box'>
                <label>Frequency</label><br />
                <select {...register('frequency')}>
                    <option value="ONE_TIME">One time</option>
                    <option value="DAILY">Daily</option>
                    <option value="MONTHLY">Monthly</option>
                </select>
                {formState.errors.frequency && <small>{formState.errors.frequency.message}</small>}
            </div>

            {/* input date */}
            <div className='input-box'>
                <label>Start Date</label><br />
                <input
                    type='date'
                    value={(date.current === undefined) ? new Date().toISOString().split('T')[0] : date.current}
                    {...register('date')}
                />
                {formState.errors.date && <small>{formState.errors.date.message}</small>}
            </div>

            <div className='t-btn input-box'>
                <input type='submit' value={isSaving ? "Saving..." : 'Save transaction'}
                    className={isSaving ? "button button-fill loading" : "button button-fill"} />
                <input type='submit' className='button outline' value='Cancel' onClick={(e) => cancelProcess(e)} />

            </div>
            {
                transaction ?
                    <div className='t-btn input-box'>
                        <button
                            className={isDeleting ? "button delete loading" : "button delete"}
                            onClick={(e) => deleteTransaction(e, transaction.planId)} 
                        >
                            {isDeleting ? "Deleting..." : 'Delete transaction'} 
                        </button>
                    </div>
                    : <></>
            }
        </form>
    )
}

export default SavedTransactionForm;