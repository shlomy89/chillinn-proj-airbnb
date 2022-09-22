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
import { sum } from 'lodash'

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
    const [value, setValue] = useState(null)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [agesData, setAgesData] = useState(agesInfo)
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
    }

    function handleSelect(ranges) {
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }

    const [showDatePicker, setShowDatePicker] = useState(false)
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => {
        setOpen(true)
        console.log('handleOpen')
    }
    const handleClose = () => setOpen(false)

    const dispatch = useDispatch()

    const onClick = () => {
        dispatch(
            onAddOrder({
                stay,
                startDate,
                endDate,
                guestsNum: sum(agesData, 'value')
            })
        )
    }

    return (
        <div className='reservation-card-container'>
            <div className='reservation-card-header'>
                <div className='price-per-night'>
                    $533 <span className='per-night'>night</span>
                </div>
                <StarRating rating={4.9} reviews={7} />
            </div>
            {!showDatePicker && (
                <div className='rdrDateDisplayWrapper'>
                    <div
                        className='rdrDateDisplay'
                        style={{
                            color: 'rgb(61, 145, 255)'
                        }}
                    >
                        <div
                            onClick={() => {
                                console.log('check')
                                setShowDatePicker(true)
                            }}
                            className='rdrDateInput rdrDateDisplayItem rdrDateDisplayItemActive'
                        >
                            <input
                                readOnly=''
                                placeholder='Early'
                                value={moment(startDate).format('MMM DD, YYYY')}
                            />
                        </div>
                        <span className='rdrDateInput rdrDateDisplayItem'>
                            <input
                                readOnly=''
                                placeholder='Continuous'
                                value={moment(endDate).format('MMM DD, YYYY')}
                            />
                        </span>
                    </div>
                </div>
            )}
            {showDatePicker && (
                <>
                    <DateRangePicker
                        showPreview={false}
                        onChange={handleSelect}
                        ranges={[selectionRange]}
                        staticRanges={[]}
                        inputRanges={[]}
                        placeholder='asdf'
                    />
                    <div
                        onClick={() => setShowDatePicker(false)}
                        className='close-date-picker'
                    >
                        Close
                    </div>
                </>
            )}
            <Dropdown agesData={agesData} setAgesData={setAgesData} />
            <ReserveButton onClick={onClick} />
            <p className='no-charge'>you won't be charged yet</p>
            <section className='summary-price-container'>
                <SummaryPrice text={'$320 x 5 nigths'} total={1600} />
                <SummaryPrice text={'Cleaning fee'} total={144} />
                <SummaryPrice text={'Service fee'} total={0} />
            </section>
            <div className='total-price'></div>
            <SummaryPrice text={'Total'} total={1744} />
        </div>
    )
}
