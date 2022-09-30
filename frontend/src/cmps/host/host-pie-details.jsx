import { Cell, Pie, PieChart } from 'recharts';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { filter } from 'lodash';

const ChartPieIndex = ({ orderStatus }) => {
    return (
        <div className="index-container">
            <div className={clsx('index-color', orderStatus)} />
            <span className="index-text">{orderStatus}</span>
        </div>
    );
};

export const HostPieDetails = () => {
    const orders = useSelector(state => state.orderModule.orders);
    const approvedOrders = filter(orders, { orderStatus: 'approved' });
    const rejectedOrders = filter(orders, { orderStatus: 'rejected' });
    const pendingOrders = filter(orders, { orderStatus: 'pending' });

    const data = [
        {
            name: 'Approved',
            value: approvedOrders.length,
            color: 'rgba(103,193,57,255)',
        },
        {
            name: 'Rejected',
            value: rejectedOrders.length,
            color: 'rgba(244,108,108,255)',
        },
        {
            name: 'Pending',
            value: pendingOrders.length,
            color: 'rgba(252,94,6,255)',
        },
    ];

    return (
        <div className="pie-chart-container">
            <PieChart width={210} height={210}>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={50}>
                    {data.map((entry, index) => (
                        <Cell fill={entry.color} key={index} />
                    ))}
                </Pie>
            </PieChart>
            <div className="chart-pie-index-container">
                <ChartPieIndex orderStatus={`${data[2].value} pending`} />
                <ChartPieIndex orderStatus={`${data[1].value} rejected`} />
                <ChartPieIndex orderStatus={`${data[0].value} approved`} />
            </div>
        </div>
    );
};
