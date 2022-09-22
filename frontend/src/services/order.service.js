import { httpService } from './http.service.js'

export const orderService = {
    query,
    getById,
    save,
    update,
    remove,
    getUsersByOrders
}

async function query(userId, type) {
    const orders = await httpService.get(
        'order' /* { params: { userId, type } }*/
    )
    return orders
}

async function getUsersByOrders() {
    const users = await httpService.get('user/orders')
    return users
}

async function getById(orderId) {
    const order = await httpService.get(`order/${orderId}`)
    return order
}

function remove(orderId) {
    return httpService.delete(`order/${orderId}`)
}

function save(order) {
    const saveOrder = httpService.post('order', order)
    return saveOrder
}

async function update(order) {
    const UpdateOrder = await httpService.put(`order/${order._id}`, order)
    return UpdateOrder
}
