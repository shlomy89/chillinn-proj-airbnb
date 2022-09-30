import { AgGridReact } from 'ag-grid-react';
import { ActionsCell } from './actions-cell';
import { find, map } from 'lodash';
import { useSelector } from 'react-redux';
import moment from 'moment';

export const OrdersTable = () => {
    const orders = useSelector(state => state.orderModule.orders);
    const users = useSelector(state => state.orderModule.users);
    const stays = useSelector(state => state.stayModule.hostStays);

    if (!users.length) {
        return null;
    }

    return (
        <AgGridReact
            className="orders-table"
            defaultColDef={{
                sortable: true,
                resizable: true,
                flex: 1,
                minWidth: 100,
                filter: true,
            }}
            animateRows
            gridOptions={{ suppressCellSelection: true }}
            rowClass="order-row"
            columnDefs={[
                {
                    headerName: '',
                    field: 'userImage',
                    cellClass: 'order-user-image-container',
                    sortable: false,
                    suppressMenu: true,
                    suppressFillHandle: true,
                    cellRenderer: props => {
                        return <img className="order-user-image" src={props.data.userImage} />;
                    },
                },
                { headerName: 'Name', field: 'name', cellClass: 'order-row-cell' },
                {
                    headerName: 'Stay Name',
                    field: 'stayName',
                    minWidth: 200,
                    cellClass: 'order-row-cell',
                },
                {
                    headerName: 'Check in',
                    field: 'checkIn',
                    cellClass: 'order-row-cell',
                    comparator: (orderA, orderB) => {
                        const dateA = moment(orderA).toDate().getTime();
                        const dateB = moment(orderB).toDate().getTime();
                        return dateA >= dateB ? -1 : 1;
                    },
                },
                {
                    headerName: 'Check out',
                    field: 'checkOut',
                    cellClass: 'order-row-cell',
                    comparator: (orderA, orderB) => {
                        const dateA = moment(orderA).toDate().getTime();
                        const dateB = moment(orderB).toDate().getTime();
                        return dateA >= dateB ? -1 : 1;
                    },
                },
                { headerName: 'Total', field: 'price', cellClass: 'order-row-cell' },
                {
                    headerName: 'Actions',
                    field: 'actions',
                    minWidth: 200,
                    sort: 'asc',
                    filter: false,
                    comparator: (orderA, orderB) => {
                        if (orderA.orderStatus === 'pending') {
                            return -1;
                        }
                        if (orderB.orderStatus === 'pending') {
                            return -1;
                        }
                        return 0;
                    },
                    cellRenderer: props => <ActionsCell order={props.data} />,
                },
            ]}
            rowData={map(orders, order => {
                const stay = find(stays, { _id: order.stayId });
                if (!stay) {
                    return null;
                }
                const user = find(users, { _id: order.userId });
                return {
                    userImage: user.imgUrl,
                    name: `${user.firstname} ${user.lastname}`,
                    stayName: stay.name,
                    checkIn: getDate(order.startDate),
                    checkOut: getDate(order.endDate),
                    price: (order.nights * stay.price).toFixed(2) + '$',
                    orderStatus: order.orderStatus,
                    actions: order,
                };
            })}
        />
    );
};

const getDate = date => `${moment(date).format('MMM DD, YYYY')}`;
