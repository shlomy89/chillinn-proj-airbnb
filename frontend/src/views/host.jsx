import { HostPieDetails } from '../cmps/host/host-pie-details'
import '../assets/styles/cmps/_host-summary.scss'
import { Review } from '../cmps/details-cmp/review'
import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { reviewService } from '../services/review.service'
import { stayService } from '../services/stay.service'
import { Order } from '../cmps/details-cmp/order'
import { HostSummaryIncome } from '../cmps/details-cmp/host-summary-income'
import { useDispatch, useSelector } from 'react-redux'
import {
    loadOrder,
    loadOrders,
    onUpdateOrder
} from '../store/actions/order.actions'
import { loadStays } from '../store/actions/stay.action.js'

export const Host = () => {
    const dispatch = useDispatch()

    const { id: hostId } = useParams()

    const orders = useSelector((state) => state.orderModule.orders)
    const users = useSelector((state) => state.orderModule.users)
    const stays = useSelector((state) => state.stayModule.stays)
    const filterBy = useSelector((state) => state.stayModule.filterBy)

    useEffect(() => {
        dispatch({ type: 'SET_FILTER_BY', filterBy: { hostId } })
    }, [hostId])

    useEffect(() => {
        dispatch(loadStays())
    }, [filterBy?.hostId])

    useEffect(() => {
        if (!stays.length) {
            return
        }
        dispatch(loadOrders({ stayId: stays[0]._id }))
    }, [stays])

    const onUpdateOrderClick = (order, orderStatus) => {
        dispatch(
            onUpdateOrder({
                ...order,
                orderStatus
            })
        )
    }

    return (
        <div className='orders-status-header'>
            Orders status
            <section className='host-container'>
                <div className='orders-status-container'>
                    <section className='reviews-container'>
                        {users.length > 0 &&
                            orders.map((order) => {
                                const stay = stays.find(
                                    (stay) => stay._id === order.stayId
                                )

                                if (!stay) return null
                                const user = users.find(
                                    (user) => user._id === order.userId
                                )
                                return (
                                    <Order
                                        ket={order._id}
                                        onClick={onUpdateOrderClick}
                                        name={
                                            user
                                                ? `${user.firstname} ${user.lastname}`
                                                : 'Guest'
                                        }
                                        order={order}
                                        apartmentLocation={` ${stay.loc.city}, ${stay.loc.country}`}
                                        userImg={user?.imgUrl}
                                    />
                                )
                            })}
                    </section>
                </div>

                <div className='hosting-summary-container'>
                    <span className='hosting-header'>Hosting Summary</span>
                    <span className='secondary-header'>Fantastic Job!</span>

                    <span className='guests-info'>
                        Guests love what you're doing, keep up the good work and
                        review your orders stats!
                    </span>
                    <HostSummaryIncome />
                </div>
            </section>
        </div>
    )
}
