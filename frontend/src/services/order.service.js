import { httpService } from './http.service.js'

export const orderService = {
    query,
    getById,
    save,
    update,
    remove
}

async function query(userId, type) {
    const orders = await httpService.get('Order', { params: { userId, type } })
    return orders
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
    const UpdateOrder = await httpService.put(`order/${orderId}`, order)
    return UpdateOrder
}
