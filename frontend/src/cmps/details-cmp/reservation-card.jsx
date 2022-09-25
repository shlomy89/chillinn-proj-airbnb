import { useState } from 'react'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRangePicker } from 'react-date-range'
import '../../assets/styles/cmps/_reservation-card.scss'
import { StarRating } from './start-rating'
import moment from 'moment/moment'
import { Dropdown } from './guests-dropdown'
import { ReserveButton } from './reserve-button'
import { SummaryPrice } from './summary-price'
import * as React from 'react'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { onAddOrder } from '../../store/actions/order.actions'
import { sum, sumBy, values } from 'lodash'
import { DatePicker } from './date-picker'

const agesInfo = {
    Adults: {
        type: 'Adults',
        info: 'Age 13+',
        value: 1
    },
    Children: {
        type: 'Children',
        info: 'Ages 2-12',
        value: 0
    },
    Infants: {
        type: 'Infants',
        info: 'Under 2',
        value: 0
    }
}

export const ReservationCard = ({ stay }) => {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(
        new Date(Date.now() + 24 * 60 * 60 * 1000)
    )
    const [agesData, setAgesData] = useState(agesInfo)

    const dispatch = useDispatch()

    const onClick = () => {
        dispatch(
            onAddOrder({
                stay,
                startDate,
                endDate,
                guestsNum: sumBy(values(agesData), 'value'),
                nights
            })
        )
    }

    const nights = (endDate - startDate) / (1000 * 60 * 60 * 24)

    return (
        <div className='reservation-card-container'>
            <div className='reservation-card-header'>
                <div className='price-per-night'>
                    <span className='price'>${stay.price}</span>{' '}
                    <span className='per-night'>night</span>
                </div>
                <StarRating rating={4.9} reviews={stay.reviews.length} />
            </div>
            <DatePicker
                checkIn={startDate}
                checkOut={endDate}
                setCheckIn={setStartDate}
                setCheckOut={setEndDate}
            />
            <Dropdown
                agesData={agesData}
                setAgesData={setAgesData}
                capacity={stay.capacity}
            />
            <ReserveButton onClick={onClick} />
            <p className='no-charge'>you won't be charged yet</p>
            <section className='summary-price-container'>
                <SummaryPrice
                    text={`${stay.price} * ${nights} nights`}
                    total={stay.price * nights}
                />

                <SummaryPrice
                    text={'Service fee'}
                    total={Math.round(stay.price * nights * 0.14)}
                />
            </section>
            <div className='total-price'></div>
            <SummaryPrice
                text={'Total'}
                total={Math.round(stay.price * nights * 1.14)}
            />
        </div>
    )
}

//   function handleSelect(ranges) {
//       setStartDate(ranges.selection.startDate)
//       setEndDate(ranges.selection.endDate)
//   }

//   const [showDatePicker, setShowDatePicker] = useState(false)
//   const [open, setOpen] = React.useState(false)
//   const handleOpen = () => {
//       setOpen(true)
//   }
//   const handleClose = () => setOpen(false)
/* <div className='show-date-picker-wrapper'>
    {!showDatePicker && (
        <div className='show-date-picker-close'>
        <div
        className='rdrDateDisplay'
        style={{
            color: 'rgb(61, 145, 255)'
        }}
        >
        <div
        onClick={() => {
            setShowDatePicker(true)
        }}
        className='rdrDateInput rdrDateDisplayItem rdrDateDisplayItemActive'
        >
        <input
        readOnly=''
        placeholder='Early'
        value={moment(startDate).format(
            'MMM DD, YYYY'
            )}
                    />
                </div>
                <span className='rdrDateInput rdrDateDisplayItem'>
                <input
                readOnly=''
                placeholder='Continuous'
                value={moment(endDate).format(
                    'MMM DD, YYYY'
                    )}
                    />
                    </span>
                    </div>
                    </div>
                    )}
                    {showDatePicker && (
        <div className='date-range-picker-container'>
            <DateRangePicker
                preventOverflow={false}
                showPreview={false}
                onChange={handleSelect}
                ranges={[selectionRange]}
                staticRanges={[]}
                inputRanges={[]}
                className='date-range-picker'
            />
            <div
                onClick={() => setShowDatePicker(false)}
                className='close-date-picker'
            >
                Close
            </div>
        </div>
    )} */

/* </div> */
