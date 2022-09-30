import { ActionButtons } from './action-buttons';
import { onUpdateOrder } from '../../store/actions/order.actions';
import { useDispatch } from 'react-redux';
import { OrderStatus } from '../order-status';

export const ActionsCell = ({ order }) => {
    const dispatch = useDispatch();

    const onUpdateOrderClick = (order, orderStatus) => {
        dispatch(
            onUpdateOrder({
                ...order.actions,
                orderStatus,
            })
        );
    };

    return order.orderStatus === 'pending' ? (
        <ActionButtons
            onApproveClick={() => onUpdateOrderClick(order, 'approved')}
            onRejectClick={() => onUpdateOrderClick(order, 'rejected')}
        />
    ) : (
        <OrderStatus orderStatus={order.orderStatus} />
    );
};
