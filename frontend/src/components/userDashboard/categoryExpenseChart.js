import { XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, Cell } from 'recharts';
import { useEffect, useState } from 'react';
import Loading from '../utils/loading';
import Error from '../utils/error';
import useCategorySummary from '../../hooks/useCategorySummary';
import Empty from '../utils/empty';

function CategoryExpenseChart({ setMessage, currentMonth }) {

    const [data, message, isFetching] = useCategorySummary(currentMonth)

    useEffect(() => {
        setMessage(message)
    }, [message, data])

    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    return (
        <ResponsiveContainer className="chart"  style={{ border: '1px solid grey' }}>
            {
                data.length === 0 && isFetching ? <Loading /> :
                    data.length === 0 && !isFetching ? <Empty message="You have no expenses in this period!"/> :
                        <BarChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 20,
                                right: 0,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="2" />
                            <XAxis dataKey="category" fontSize='10px' />
                            <YAxis />
                            <Bar dataKey="amount" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % data.length]} />
                                ))}
                            </Bar>
                        </BarChart>
            }

        </ResponsiveContainer>
    )
}

export default CategoryExpenseChart;