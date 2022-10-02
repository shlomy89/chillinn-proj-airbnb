import { useState } from 'react'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import '../../assets/styles/cmps/_reservation-card.scss'
import { StarRating } from './star-rating'
import { Dropdown } from './guests-dropdown'
import { ReserveButton } from './reserve-button'
import { SummaryPrice } from './summary-price'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { onAddOrder } from '../../store/actions/order.actions'
import { sumBy, values } from 'lodash'
import { DatePicker } from './date-picker'



const agesInfo = {
    Adults: {
        type: 'Adults',
        info: 'Age 13+',
        value: 1,
    },
    Children: {
        type: 'Children',
        info: 'Ages 2-12',
        value: 0,
    },
    Infants: {
        type: 'Infants',
        info: 'Under 2',
        value: 0,
    },
}

export const ReservationCard = ({ stay, rating, reviews }) => {

    const defultEndDate = new Date(new Date().setDate(new Date().getDate() + 2))

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(defultEndDate)
    const [agesData, setAgesData] = useState(agesInfo)


    const dispatch = useDispatch()

    const onClick = () => {
        dispatch(
            onAddOrder({
                stay,
                startDate,
                endDate,
                guestsNum: sumBy(values(agesData), 'value'),
                nights,
            })
        )
    }

    const nights = (endDate - startDate) / (1000 * 60 * 60 * 24)

    return (
        <div className="reservation-card-container">
            <div className="reservation-card-header">
                <div className="price-per-night">
                    <span className="price">${stay.price}</span> <span className="per-night">night</span>
                </div>
                <StarRating rating={rating} reviews={reviews?.length} />
            </div>
            <DatePicker
                unavailableDates={stay.unavailableDats}
                checkIn={startDate}
                checkOut={endDate}
                setCheckIn={setStartDate}
                setCheckOut={setEndDate}
            />
            <Dropdown agesData={agesData} setAgesData={setAgesData} capacity={stay.capacity} />

            <ReserveButton
                onClick={onClick}
                stay={stay}
                startDate={startDate}
                endDate={endDate}
                guestsNum={sumBy(values(agesData), 'value')}
                pricePerNight={Math.round(stay.price * nights)}
                serviceFee={Math.round(stay.price * nights * 0.14)}
                totalPrice={Math.round(stay.price * nights * 1.14)}
            />
            <p className="no-charge">you won't be charged yet</p>
            <section className="summary-price-container">
                <SummaryPrice text={`${stay.price} * ${nights} nights`} total={Math.round(stay.price * nights)} />

                <SummaryPrice text={'Service fee'} total={Math.round(stay.price * nights * 0.14)} />
            </section>
            <div className="total-price"></div>
            <SummaryPrice text={'Total'} total={Math.round(stay.price * nights * 1.14)} />
        </div>
    )
}
