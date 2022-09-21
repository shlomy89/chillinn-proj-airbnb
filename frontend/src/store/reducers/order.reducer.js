const initialState = {
    orders: [],
    users: [],
    order: null
}
export function orderReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ORDERS':
            return { ...state, orders: action.orders }
        case 'SET_USERS':
            return { ...state, users: action.users }
        case 'SET_ORDER':
            return { ...state, order: action.order }
        // case 'REMOVE_ORDER':
        //     const lastRemovedOrder = state.orders.find(
        //         (order) => order._id === action.orderId
        //     )
        //     const orders = state.orders.filter(
        //         (order) => order._id !== action.orderId
        //     )
        //     return { ...state, orders, lastRemovedOrder }
        // case 'ADD_ORDER':
        //     return { ...state, orders: [...orders, action.order] }
        // case 'UPDATE_ORDER':
        //     const orders = state.orders.map((order) =>
        //         order._id === action.order_Id ? action.order : order
        //     )
        //     return { ...state, orders, order: action.order }
        default:
            return state
    }
}
