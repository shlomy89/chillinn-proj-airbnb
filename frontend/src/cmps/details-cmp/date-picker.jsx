import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import addWeeks from 'date-fns/addWeeks'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { TextField, createTheme, ThemeProvider } from '@mui/material'
import { DateRangePicker } from '@mui/x-date-pickers-pro'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
const mode = window.innerWidth < 780 ? 1 : 2
const theme = createTheme({
    palette: {
        primary: {
            main: '#2e53ab'
        },
        secondary: {
            main: '#2e53ab'
        }
    }
})

export function DatePicker({ checkIn, setCheckIn, checkOut, setCheckOut }) {
    const dispatch = useDispatch()

    function getWeeksAfter(date, amount) {
        return date ? addWeeks(date, amount) : undefined
    }

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateRangePicker
                    disablePast
                    calendars={mode}
                    value={[checkIn, checkOut]}
                    maxDate={getWeeksAfter(checkIn, 8)}
                    onChange={(newValue) => {
                        setCheckIn(newValue[0])
                        setCheckOut(newValue[1])
                    }}
                    startText='Check-in'
                    endText='Check-out'
                    renderInput={(startProps, endProps) => (
                        <React.Fragment>
                            <TextField
                                className={'start-date'}
                                {...startProps}
                            />
                            <TextField className={'end-date'} {...endProps} />
                            {/* <span>{removeUrl}</span> */}
                        </React.Fragment>
                    )}
                />
            </LocalizationProvider>
        </ThemeProvider>
    )
}

// const removeUrl = (
//     <img
//         onClick={() =>
//             dispatch(
//                 setOrder({
//                     ...order,
//                     checkIn: null,
//                     checkOut: null,
//                     guestsCount: 1,
//                     adults: 1,
//                     children: 0,
//                     infants: 0
//                 })
//             )
//         }
//         className='clear-dates'
//         src={remove}
//     />
// )
