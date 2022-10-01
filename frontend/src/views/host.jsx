import '../assets/styles/cmps/_host-summary.scss'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadOrders } from '../store/actions/order.actions'
import { loadHostStays } from '../store/actions/stay.action.js'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import 'ag-grid-community/styles/ag-theme-balham.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import { OrdersTable } from '../cmps/host/orders-table'
import {
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart
} from 'recharts'
import { keys, map, meanBy, sumBy } from 'lodash'
import { loadReviews } from '../store/actions/review.actions'
import { HostPieDetails } from '../cmps/host/host-pie-details'

export const Host = () => {
    const dispatch = useDispatch()

    const { id: hostId } = useParams()

    const orders = useSelector((state) => state.orderModule.orders)
    const users = useSelector((state) => state.orderModule.users)
    const stays = useSelector((state) => state.stayModule.hostStays)
    const user = useSelector((state) => state.userModule.user)
    const filterBy = useSelector((state) => state.stayModule.filterBy)
    const reviews = useSelector((state) => state.reviewModule.reviews)

    useEffect(() => {
        dispatch({ type: 'SET_FILTER_BY', filterBy: { hostId } })
    }, [hostId])

    useEffect(() => {
        dispatch(loadHostStays())
    }, [filterBy?.hostId])

    useEffect(() => {
        if (!stays.length) {
            return
        }
        dispatch(loadOrders({ stayId: stays[0]._id }))
        dispatch(loadReviews({ stayId: stays[0]._id }))
    }, [stays])

    return (
        <div className='host-page-wrapper'>
            <div className='host-page-container'>
                <span className='host-header'>Hi {user.firstname}! </span>
                <div className='host-container'>
                    <section className='orders-wrapper ag-theme-material'>
                        <OrdersTable />
                    </section>

                    <div className='summary-container'>
                        <div className='summary'>
                            <span className='summary-header'>
                                Reviews Summary
                            </span>
                            <span className='summary-header'>
                                Total Reviews: {reviews.length}
                            </span>
                            <RadarChart
                                outerRadius={90}
                                width={520}
                                height={250}
                                tick={false}
                                data={map(
                                    keys(reviews[0]?.rating),
                                    (ratingKey) => ({
                                        subject:
                                            ratingKey.charAt(0).toUpperCase() +
                                            ratingKey.slice(1),
                                        total: meanBy(
                                            reviews,
                                            (review) => review.rating[ratingKey]
                                        )
                                    })
                                )}
                            >
                                <PolarGrid />
                                <PolarAngleAxis
                                    dataKey={({ subject, total }) =>
                                        `${subject} (${total})`
                                    }
                                />
                                <PolarRadiusAxis angle={30} domain={[0, 5]} />
                                <Radar
                                    dataKey='total'
                                    stroke='#8884d8'
                                    fill='#8884d8'
                                    fillOpacity={0.6}
                                />
                            </RadarChart>
                        </div>

                        <div className='summary'>
                            <span className='orders-header'>
                                Orders Summary
                            </span>
                            <span className='orders-header'>
                                Total Orders: {orders.length}
                            </span>
                            <HostPieDetails />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
