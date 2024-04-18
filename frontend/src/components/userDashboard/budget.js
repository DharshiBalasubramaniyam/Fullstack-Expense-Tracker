import { useState } from "react";
import { useForm } from 'react-hook-form';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import '../../assets/styles/transactionList.css'

function Budget({totalExpense, budgetAmount, saveBudget, currentMonth}) {

    const { register, handleSubmit, reset, formState } = useForm();
    const [formToggle, setFormToggle] = useState(false)
    const balance = (budgetAmount-totalExpense < 0) ? 0 : budgetAmount-totalExpense

    const toggleForm = (e) => {
        e.preventDefault()
        setFormToggle(!formToggle)
        reset({amount: budgetAmount})
    }

    const onSubmit = (formData) => {
        saveBudget(formData)
        setFormToggle(!formToggle)
        reset({amount: budgetAmount})
    }

    const data2 = [
        { name: 'Spent', value: totalExpense },
        { name: 'Balace', value:  balance}
    ];

    const COLORS2 = ["#ff6464", "#53d37d"];

    return (
        <>
            <div className='chart'>
                <div className="chart-top">
                    <h2>Budget: {budgetAmount}</h2> 
                    {
                        (currentMonth.id === new Date().getMonth() + 1) && ( <button onClick={toggleForm}>Edit</button> )
                    }
                </div>
                <ResponsiveContainer height={220}>
                    <PieChart width={50} height={100}>
                        <Pie
                            data={data2}
                            cx={280}
                            cy={140}
                            startAngle={180}
                            endAngle={0}
                            innerRadius={80}
                            outerRadius={110}
                            fill="#8884d8"
                            paddingAngle={0}
                            dataKey="value"
                            label
                        >
                            {data2.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS2[index]} />
                            ))}
                        </Pie>
                        <Legend />
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                <h4>Remaining: {budgetAmount - totalExpense}</h4>
            </div>

            <div className={formToggle ? 'budget-form active' : 'budget-form'}>
                <form className='auth-form t-form' onSubmit={handleSubmit(onSubmit)}>
                    <h1>Budget settings</h1>
                    <hr/>
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
                    <div className='t-btn input-box'>
                        <input type='submit' value="Save"
                            className="button button-fill" />
                        <input type='submit' className='button outline' value='Cancel' onClick={(e) => toggleForm(e)} />
                    </div>
                </form>
            </div>
        </>
    )
}

export default Budget;