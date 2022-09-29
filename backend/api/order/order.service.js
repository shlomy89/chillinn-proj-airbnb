const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const { GUEST_ID } = require('../user/user.service')
const ObjectId = require('mongodb').ObjectId

async function getOrders(stayId) {
    try {
        const collection = await dbService.getCollection('order')
        const orders = await collection
            .find({ stayId: ObjectId(stayId) })
            .toArray()
        console.log({ orders })
        return orders
    } catch (err) {
        logger.error('cannot find orders', err)
        throw err
    }
}

async function getById(orderId) {
    try {
        const collection = await dbService.getCollection('order')
        const order = await collection.findOne({ _id: orderId })

        return order
    } catch (err) {
        logger.error(`while finding order ${orderId}`, err)
        throw err
    }
}

async function remove(orderId) {
    try {
        const collection = await dbService.getCollection('order')
        await collection.deleteOne({ _id: ObjectId(orderId) })
        return orderId
    } catch (err) {
        logger.error(`cannot remove order ${orderId}`, err)
        throw err
    }
}

async function add(order) {
    order.createdAt = Date.now()
    order.orderStatus = 'pending'
    try {
        console.log({ order })
        const collection = await dbService.getCollection('order')
        const userId = ObjectId(order.userId ?? GUEST_ID)
        const addedOrder = await collection.insertOne({
            ...order,
            userId,
            stayId: ObjectId(order.stayId)
        })
        console.log({ addedOrder })
        return addedOrder
    } catch (err) {
        logger.error('cannot insert order', err)
        throw err
    }
}

async function update(order) {
    try {
        var id = ObjectId(order._id)
        delete order._id
        const collection = await dbService.getCollection('order')
        await collection.updateOne({ _id: id }, { $set: { ...order } })
        return order
    } catch (err) {
        logger.error(`cannot update order ${order._id}`, err)
        throw err
    }
}

module.exports = {
    getOrders,
    getById,
    add,
    update,
    remove
}
