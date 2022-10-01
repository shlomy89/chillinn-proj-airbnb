import * as React from 'react'
import { useEffect, useState } from 'react'
import addWeeks from 'date-fns/addWeeks'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { TextField, createTheme, ThemeProvider } from '@mui/material'
import { DateRangePicker } from '@mui/x-date-pickers-pro'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

const mode = window.innerWidth < 780 ? 1 : 2;

const theme = createTheme({
    palette: {
        primary: {
            main: '#2e53ab',
        },
        secondary: {
            main: '#2e53ab',
        },
    },
})

export function DatePicker({ checkIn, setCheckIn, checkOut, setCheckOut }) {

    function getWeeksAfter(date, amount) {
        return date ? addWeeks(date, amount) : undefined;
    }

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateRangePicker
                    disablePast
                    calendars={mode}
                    value={[checkIn, checkOut]}
                    maxDate={getWeeksAfter(checkIn, 8)}
                    onChange={newValue => {
                        setCheckIn(newValue[0])
                        setCheckOut(newValue[1])
                    }}
                    startText="Check-in"
                    endText="Check-out"
                    renderInput={(startProps, endProps) => (
                        <React.Fragment>
                            <TextField className={'start-date'} {...startProps} />
                            <TextField className={'end-date'} {...endProps} />
                            {/* <span>{removeUrl}</span> */}
                        </React.Fragment>
                    )}
                />
            </LocalizationProvider>
        </ThemeProvider>
    );
}