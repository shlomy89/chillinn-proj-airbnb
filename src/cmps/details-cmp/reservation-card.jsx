import { useState } from 'react'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRangePicker } from 'react-date-range'
import '../../assets/styles/cmps/_reservation-card.scss'
import { StarRating } from './start-rating'
import moment from 'moment/moment'
import { Dropdown } from './guests-dropdown'

export const ReservationCard = () => {
    const [value, setValue] = useState(null)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    // const []

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

    return (
        <div className='reservation-card-container'>
            <div className='reservation-card-header'>
                <div className='price-per-night'>$533</div>
                <StarRating rating={5.0} reviews={7} />
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
                            onClick={() => setShowDatePicker(true)}
                            className='rdrDateInput rdrDateDisplayItem rdrDateDisplayItemActive'
                        >
                            <input
                                readOnly=''
                                placeholder='Early'
                                defaultValue={moment(startDate).format('MMM DD, YYYY')}
                            />
                        </div>
                        <span className='rdrDateInput rdrDateDisplayItem'>
                            <input
                                readOnly=''
                                placeholder='Continuous'
                                defaultValue={moment(endDate).format('MMM DD, YYYY')}
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
            <Dropdown />
        </div>
    )
}
