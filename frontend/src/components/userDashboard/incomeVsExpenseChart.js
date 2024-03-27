import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loading from '../utils/loading';
import Error from '../utils/error';
import useExpenseVsIncomeSummary from '../../hooks/useExpenseVsIncomeSummary';

function IncomeVsExpenseChart({ setMessage, months }) {
    const [data, message, isFetching] = useExpenseVsIncomeSummary(months)

    useEffect(() => {
        
        if (data.length!==0) {
            setMessage(message)
        }
    }, [data, message])


    return (
        <ResponsiveContainer className="chart" style={{ border: '1px solid grey' }}>
            {
                data.length === 0 && isFetching ? <Loading /> :
                    data.length === 0 && !isFetching ? <Error /> :
                        <LineChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 20,
                                right: 0,
                                left: 0,
                                bottom: -22,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="monthName" fontSize='10px' />
                            <YAxis />
                            <Legend />
                            <Line type="monotone" dataKey="totalExpense" name='Expense' stroke="#ff0000" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="totalIncome" name='Income' stroke="#6aa412" />
                        </LineChart>
            }

        </ResponsiveContainer>
    )
}

export default IncomeVsExpenseChart;