import { PieChart, Pie, Cell } from 'recharts'
import clsx from 'clsx'

const data = [
    {
        name: 'Approved',
        value: 121,
        color: 'rgba(103,193,57,255)'
    },
    {
        name: 'Rejected',
        value: 25,
        color: 'rgba(244,108,108,255)'
    },
    {
        name: 'Pending',
        value: 30,
        color: 'rgba(252,94,6,255)'
    }
]

const ChartPieIndex = ({ orderStatus }) => {
    return (
        <div className='index-container'>
            <div className={clsx('index-color', orderStatus)} />
            <span className='index-text'>{orderStatus}</span>
        </div>
    )
}

export const HostPieDetails = () => {
    return (
        <div className='pie-chart-container'>
            <PieChart width={210} height={210}>
                <Pie
                    data={data}
                    dataKey='value'
                    nameKey='name'
                    cx='50%'
                    cy='50%'
                    outerRadius={100}
                    innerRadius={50}
                >
                    {data.map((entry, index) => (
                        <Cell fill={entry.color} key={index} />
                    ))}
                </Pie>
            </PieChart>
            <div className='chart-pie-index-container'>
                <ChartPieIndex orderStatus={'pending'} />
                <ChartPieIndex orderStatus={'rejected'} />
                <ChartPieIndex orderStatus={'approved'} />
            </div>
        </div>
    )
}
