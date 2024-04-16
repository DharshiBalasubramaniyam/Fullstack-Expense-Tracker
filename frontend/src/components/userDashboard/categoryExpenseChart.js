import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';


function CategoryExpenseChart({ categorySummary }) {
    const COLORS = ["#ff6e6e", "#ffb26e", "#e6cd10", "#00a33c", "#6ea1ff", "#a36eff", "#ff6eff", "#6ee0ff", "#676d6e"];

    return (
        <div className='chart'>
            <ResponsiveContainer>
                <PieChart width={50} height={100}>
                    <Pie
                        data={categorySummary}
                        cx={280}
                        cy={135}
                        innerRadius={80}
                        outerRadius={110}
                        fill="#8884d8"
                        paddingAngle={0}
                        dataKey="amount"
                        label
                    >
                        {categorySummary.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend dataKey='category' />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>


    )
}

export default CategoryExpenseChart;