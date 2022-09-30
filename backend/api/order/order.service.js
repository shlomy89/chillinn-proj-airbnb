const dbService = require("../../services/db.service");
const logger = require("../../services/logger.service");
const { GUEST_ID } = require("../user/user.service");
const moment = require("moment");
const ObjectId = require("mongodb").ObjectId;

async function getOrders(stayId) {
  try {
    const collection = await dbService.getCollection("order");
    const orders = await collection
      .find({ stayId: ObjectId(stayId) })
      .toArray();

    return orders;
  } catch (err) {
    logger.error("cannot find orders", err);
    throw err;
  }
}

async function getById(orderId) {
  try {
    const collection = await dbService.getCollection("order");
    const order = await collection.findOne({ _id: orderId });

    return order;
  } catch (err) {
    logger.error(`while finding order ${orderId}`, err);
    throw err;
  }
}

async function remove(orderId) {
  try {
    const collection = await dbService.getCollection("order");
    await collection.deleteOne({ _id: ObjectId(orderId) });
    return orderId;
  } catch (err) {
    logger.error(`cannot remove order ${orderId}`, err);
    throw err;
  }
}

async function add(order) {
  order.createdAt = Date.now();
  order.orderStatus = "pending";
  try {
    const collection = await dbService.getCollection("order");
    const userId = ObjectId(order.userId ?? GUEST_ID);
    const addedOrder = await collection.insertOne({
      ...order,
      userId,
      stayId: ObjectId(order.stayId),
    });
    return addedOrder;
  } catch (err) {
    logger.error("cannot insert order", err);
    throw err;
  }
}

async function update(order) {
  try {
    const _id = ObjectId(order._id);
    const stayId = ObjectId(order.stayId);
    const userId = ObjectId(order.userId);
    const collection = await dbService.getCollection("order");
    await collection.updateOne(
      { _id },
      { $set: { ...order, _id, stayId, userId } }
    );
    const staysCollection = await dbService.getCollection("stay");
    const stay = await staysCollection.findOne({ _id: stayId });

    const dates = getDates(order.startDate, order.endDate);

    stay.unavailableDats = [...stay.unavailableDats, ...dates];

    await staysCollection.updateOne(
      { _id: stayId },
      { $set: { ...stay, _id: stayId } }
    );

    const orders = await collection.updateMany(
      {
        stayId: { $eq: stayId },
        _id: { $ne: _id },
        orderStatus: { $eq: "pending" },
        $or: [
          {
            startDate: { $gte: order.startDate, $lt: order.endDate },
          },
          {
            endDate: { $lt: order.endDate, $gt: order.startDate },
          },
          {
            startDate: { $lte: order.startDate },
            endDate: { $gte: order.endDate },
          },
        ],
      },
      { $set: { orderStatus: "rejected" } }
    );

    return order;
  } catch (err) {
    logger.error(`cannot update order ${order._id}`, err);
    throw err;
  }
}

function getDates(startDate, stopDate) {
  const dateArray = [];
  let currentDate = moment(startDate);
  const endDate = moment(stopDate);
  while (currentDate < endDate) {
    dateArray.push(moment(currentDate).toDate().getTime());
    currentDate = moment(currentDate).add(1, "days");
  }
  return dateArray;
}

module.exports = {
  getOrders,
  getById,
  add,
  update,
  remove,
};
