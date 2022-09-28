import { orderService } from '../../services/order.service.js'
import { userService } from '../../services/user.service.js'
import { socketService } from '../../services/socket.service.js'

export function loadOrders(userId, type) {
    return async (dispatch) => {
        try {
            const orders = await orderService.query(userId, type)
            dispatch({
                type: 'SET_ORDERS',
                orders
            })
            const users = await orderService.getUsersByOrders()
            dispatch({ type: 'SET_USERS', users })
        } catch (error) {
            console.log('failed to load orders in order actions', error)
        }
    }
}

export function loadOrder(orderId) {
    return async (dispatch) => {
        try {
            const order = await orderService.getById(orderId)
            dispatch({
                type: 'SET_ORDER',
                order
            })
        } catch (error) {
            console.log('failed to load order in order actions', error)
        }
    }
}

export function onRemoveOrder(orderId) {
    return async (dispatch) => {
        try {
            await orderService.remove(orderId)
            dispatch({
                type: 'REMOVE_ORDER',
                orderId
            })
        } catch (error) {
            console.log('failed to delete order in order actions', error)
        }
    }
}

export function onAddOrder({ stay, startDate, endDate, guestsNum, nights }) {
    // const { buyerUser } = orderToAdd
    return async (dispatch, getState) => {
        try {
            // const notification = {
            //     byUser: {
            // fullName: buyerUser.fullname,
            //         imgUrl: buyerUser.imgUrl,
            //         _id: buyerUser._id
            //     },
            //     createdAt: Date.now(),
            //     stay: {
            //         _id: orderToAdd.stay._id,
            //         name: orderToAdd.loc.address,
            //         reviewsAvg: orderToAdd.stay.reviewsAvg
            //     },
            //     txt: 'Your stay has been reserved',
            //     isRead: false
            // }
            const { _id: userId } = getState().userModule.user
            const stayId = stay._id
            const savedOrder = await orderService.save({
                startDate: startDate.getTime(),
                endDate: endDate.getTime(),
                guestsNum,
                nights,
                stayId,
                userId
            })
            dispatch({ type: 'ADD_ORDER', order: savedOrder })
            // socketService.emit('notificationSent', notification)
        } catch (error) {}
    }
}

export function onUpdateOrder(order) {
    return async (dispatch) => {
        try {
            await orderService.update(order)
            dispatch({ type: 'UPDATE_ORDER', order })
        } catch (error) {
            console.log('failed to cancel order in order actions', error)
        }
    }
}

export function onApprovedOrder(order) {
    return async (dispatch) => {
        try {
            const updatedOrder = await orderService.update(order)
            dispatch({ type: 'UPDATE_ORDER', order: updatedOrder })
        } catch (error) {
            console.log('failed to approve order in order actions', error)
        }
    }
}

export function setFilter(filterBy) {
    return async (dispatch) => {
        try {
            await dispatch({
                type: 'SET_FILTER',
                filter: filterBy
            })
        } catch (error) {
            console.log('filter failure in order actions', error)
        }
    }
}

// export function onEditOrder(orderToSave) {
//     return async (dispatch) => {
//         try {
//             const updatedOrder = await orderService.update(orderToSave)
//             dispatch({
//                 type: 'UPDATE_ORDER',
//                 order: updatedOrder
//             })
//         } catch (error) {
//             console.log('failed to update order in order actions', error)
//         }
//     }
// }

export function checkOut() {
    return async (dispatch, getState) => {
        try {
            const state = getState()
            const total = state.orderModule.cart.reduce(
                (acc, order) => acc + order.price,
                0
            )
            const score = await userService.changeScore(-total)
            dispatch({ type: 'SET_SCORE', score })
            dispatch({ type: 'CLEAR_CART' })
        } catch (error) {
            console.log('failed to check out order in order actions', error)
        }
    }
}
