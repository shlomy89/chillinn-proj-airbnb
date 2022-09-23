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

export const HostSummaryIncome = () => {
    const dispatch = useDispatch()

    const orders = useSelector((state) => state.orderModule.orders)
    const users = useSelector((state) => state.orderModule.users)
    const stays = useSelector((state) => state.stayModule.stays)
    const amountOfReviews = sumBy(
        filter(stays, (stay) => !!find(orders, { stayId: stay._id })),
        ({ reviews }) => reviews.length
    )
    console.log(amountOfReviews)
    useEffect(() => {
        let timeOut
        dispatch(loadStays()).then(() => {
            timeOut = setInterval(() => {
                dispatch(loadOrders())
            }, 3000)
        })
        return () => {
            clearInterval(timeOut)
        }
    }, [])
    const totalIncome = sumBy(orders, (order) => {
        const stay = find(stays, { _id: order.stayId })
        if (!stay) return 0
        return order.nights * stay.price
    })
    return (
        <div className='host-summary-income-container'>
            <div className='income-info-container'>
                <span className='income-text'>Monthly Earnings:</span>
                <span className='income-price'>*</span>
            </div>
            <div className='income-info-container'>
                <span className='income-text'>
                    Total Income: {/* Average Rating: * */}
                </span>
                <span className='income-price'>{totalIncome}</span>
            </div>
            <div className='income-info-container'>
                <span className='income-text'>Amount of reviews:</span>
                <span className='income-price'>{amountOfReviews}</span>
            </div>
            <HostPieDetails />
        </div>
    )
}
