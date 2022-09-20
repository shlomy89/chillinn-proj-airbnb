import { HostPieDetails } from '../cmps/host/pie'
import '../assets/styles/cmps/_host-summary.scss'
import { Review } from '../cmps/details-cmp/review'
import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { reviewService } from '../services/review.service'
import { stayService } from '../services/stay.service'

export const HostSummaryIncome = () => {
    return (
        <div className='host-summary-income-container'>
            <div className='income-info-container'>
                <span className='income-text'>Monthly Earnings:</span>
                <span className='income-price'>$7,098</span>
            </div>
            <div className='income-info-container'>
                <span className='income-text'>Average Rating:</span>
                <span className='income-price'>4.9</span>
            </div>
            <div className='income-info-container'>
                <span className='income-text'>Amount of reviews:</span>
                <span className='income-price'>249</span>
            </div>
        </div>
    )
}
// console.log(reviews)

export const Host = () => {
    // const [stay, setStay] = useState(null)
    // const [reviews, setReviews] = useState(null)

    // const params = useParams()
    // const navigate = useNavigate()

    // useEffect(() => {
    //     const stayId = params.id
    //     const getReviews = async () => {
    //         const stay = await stayService.getById(stayId)
    //         console.log(stay)
    //         setStay(stay)
    //         const reviews = await reviewService.query({ stayId })
    //         setReviews(reviews)
    //     }
    //     getReviews()
    // }, [params.id])
    return (
        <div className='orders-status-header'>
            Orders status
            <section className='host-container'>
                <div className='orders-status-container'>
                    <section className='reviews-container'>
                        <Review
                            name={'John Smith'}
                            date={'Reserved at: Monday August 15, 2022'}
                            review={'great vacation'}
                        />
                        <Review
                            name={'John Smith'}
                            date={'29.12.2021'}
                            review={'great vacation'}
                        />
                        <Review
                            name={'John Smith'}
                            date={'29.12.2021'}
                            review={'great vacation'}
                        />
                        <Review
                            name={'John Smith'}
                            date={'29.12.2021'}
                            review={'great vacation'}
                        />
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
                    <HostPieDetails />
                </div>
            </section>
        </div>
    )
}
