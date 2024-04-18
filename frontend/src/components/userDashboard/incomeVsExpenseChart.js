import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function IncomeVsExpenseChart({ data }) {

    return (
        <ResponsiveContainer>

            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 20,
                    right: 20,
                    left: 20,
                    bottom: 10,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="monthName" fontSize='10px' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="totalExpense" name='Expense' stroke="#ff0000" activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="totalIncome" name='Income' stroke="#6aa412" />
            </LineChart>

        </ResponsiveContainer>
    )
}

export default IncomeVsExpenseChart;