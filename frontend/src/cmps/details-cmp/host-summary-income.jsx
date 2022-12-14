import { HostPieDetails } from '../host/host-pie-details'
import { useDispatch, useSelector } from 'react-redux'
import { filter, sumBy, find } from 'lodash'
import React, { useState, useEffect, useMemo } from 'react'
import {
    loadOrder,
    loadOrders,
    onUpdateOrder
} from '../../store/actions/order.actions'
import { loadStays } from '../../store/actions/stay.action.js'

const calculateIncome = (order, stays) => {
    const stay = find(stays, { _id: order.stayId })
    if (!stay) return 0
    return order.nights * stay.price
}

export const HostSummaryIncome = () => {
    const orders = useSelector((state) => state.orderModule.orders)
    const stays = useSelector((state) => state.stayModule.hostStays)
    const approvedOrders = filter(orders, { orderStatus: 'approved' })
    const rejectedOrders = filter(orders, { orderStatus: 'rejected' })
    const pendingOrders = filter(orders, { orderStatus: 'pending' })

    const data = [
        {
            name: 'Approved',
            value: approvedOrders.length,
            color: 'rgba(103,193,57,255)'
        },
        {
            name: 'Rejected',
            value: rejectedOrders.length,
            color: 'rgba(244,108,108,255)'
        },
        {
            name: 'Pending',
            value: pendingOrders.length,
            color: 'rgba(252,94,6,255)'
        }
    ]

    const totalIncome = sumBy(approvedOrders, (order) =>
        calculateIncome(order, stays)
    )
    const monthlyIncome = sumBy(
        filter(
            approvedOrders,
            (order) => order.startDate >= Date.now() - 30 * 24 * 60 * 60 * 1000
        ),
        (order) => calculateIncome(order, stays)
    )

    return (
        <div className='host-summary-income-container'>
            <div className='income-info-container'>
                <span className='income-text'>Monthly Earnings:</span>
                <span className='income-price'>${monthlyIncome}</span>
            </div>
            <div className='income-info-container'>
                <span className='income-text'>
                    Total Income: {/* Average Rating: * */}
                </span>
                <span className='income-price'>${totalIncome.toFixed(2)}</span>
            </div>
            <div className='income-info-container'>
                <span className='income-text'>Amount of orders:</span>
                <span className='income-price'>{orders.length}</span>
            </div>
            <HostPieDetails data={data} />
        </div>
    )
}
