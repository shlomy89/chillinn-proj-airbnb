import { HostPieDetails } from '../cmps/host/host-pie-details'
import '../assets/styles/cmps/_host-summary.scss'
import { Review } from '../cmps/details-cmp/review'
import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { reviewService } from '../services/review.service'
import { stayService } from '../services/stay.service'
import { Order } from '../cmps/details-cmp/order'
import { HostSummaryIncome } from '../cmps/details-cmp/host-summary-income'

// console.log(reviews)

export const Host = () => {
    return (
        <div className='orders-status-header'>
            Orders status
            <section className='host-container'>
                <div className='orders-status-container'>
                    <section className='reviews-container'>
                        <Order
                            name={'John Smith'}
                            reservedDate={'Monday August 15, 2022'}
                            guestsNum={'3'}
                            vacationDate={'Aug 17-20'}
                            apartmentLocation={
                                'Teal Aviv-Yafo, Tel Aviv District, Israel'
                            }
                            orderStatus={'approved'}
                        />
                        <Order
                            name={'John Smith'}
                            reservedDate={'Monday August 15, 2022'}
                            guestsNum={'3'}
                            vacationDate={'Aug 17-20'}
                            apartmentLocation={
                                'Teal Aviv-Yafo, Tel Aviv District, Israel'
                            }
                            orderStatus={'approved'}
                        />
                        <Order
                            name={'John Smith'}
                            reservedDate={'Monday August 15, 2022'}
                            guestsNum={'3'}
                            vacationDate={'Aug 17-20'}
                            apartmentLocation={
                                'Teal Aviv-Yafo, Tel Aviv District, Israel'
                            }
                            orderStatus={'pending'}
                        />
                        <Order
                            name={'John Smith'}
                            reservedDate={'Monday August 15, 2022'}
                            guestsNum={'3'}
                            vacationDate={'Aug 17-20'}
                            apartmentLocation={
                                'Teal Aviv-Yafo, Tel Aviv District, Israel'
                            }
                            orderStatus={'rejected'}
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
                </div>
            </section>
        </div>
    )
}
