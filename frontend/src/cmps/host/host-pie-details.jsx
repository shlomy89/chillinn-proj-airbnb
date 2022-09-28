import { PieChart, Pie, Cell } from 'recharts'
import clsx from 'clsx'

const ChartPieIndex = ({ orderStatus }) => {
    return (
        <div className='index-container'>
            <div className={clsx('index-color', orderStatus)} />
            <span className='index-text'>{orderStatus}</span>
        </div>
    )
}

export const HostPieDetails = ({ data }) => {
    console.log('data:', data)

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
                <ChartPieIndex orderStatus={`${data[2].value} pending`} />
                <ChartPieIndex orderStatus={`${data[1].value} rejected`} />
                <ChartPieIndex orderStatus={`${data[0].value} approved`} />
            </div>
        </div>
    )
}
