import { PieChart, Pie, Cell } from 'recharts'

const data = [
    {
        name: 'Approved',
        value: 121,
        color: 'green'
    },
    {
        name: 'Rejected',
        value: 25,
        color: 'red'
    },
    {
        name: 'Pending',
        value: 30,
        color: 'orange'
    }
]

export const HostPieDetails = () => {
    return (
        <PieChart width={350} height={350}>
            <Pie
                data={data}
                dataKey='value'
                nameKey='name'
                cx='50%'
                cy='50%'
                outerRadius={100}
            >
                {data.map((entry, index) => (
                    <Cell fill={entry.color} />
                ))}
            </Pie>
        </PieChart>
    )
}