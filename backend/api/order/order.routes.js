const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
// const { log } = require('../../middlewares/logger.middleware')
const {
    getOrders,
    getOrderById,
    addOrder,
    updateOrder,
    removeOrder
} = require('./order.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getOrders)
router.get('/:id', getOrderById)
router.post('/', addOrder)
router.put('/:id', updateOrder)
router.delete('/:id', removeOrder)
// router.post('/', requireAuth, addStay)
// router.put('/:id', requireAuth, updateStay)
// router.delete('/:id', requireAuth, removeStay)

module.exports = router
