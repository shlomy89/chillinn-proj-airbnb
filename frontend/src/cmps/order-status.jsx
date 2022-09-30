import clsx from 'clsx';

export const OrderStatus = ({ orderStatus }) => (
    <span className={clsx('order-status', orderStatus)}>{orderStatus}</span>
);
