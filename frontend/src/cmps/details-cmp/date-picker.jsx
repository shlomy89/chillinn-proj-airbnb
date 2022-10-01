import React from 'react';
import addWeeks from 'date-fns/addWeeks';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { createTheme, TextField, ThemeProvider } from '@mui/material';
import '../../assets/styles/cmps/_date-picker.scss';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { find } from 'lodash';

const mode = window.innerWidth < 780 ? 1 : 2;
const theme = createTheme({
    root: {
        '& .MuiFormLabel-root': {
            color: 'red',
        },
    },
});

export function DatePicker({ checkIn, setCheckIn, checkOut, setCheckOut, unavailableDates }) {
    function getWeeksAfter(date, amount) {
        return date ? addWeeks(date, amount) : undefined;
    }

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateRangePicker
                    shouldDisableDate={props =>
                        !!find(unavailableDates, date => props <= date && props > date - 24 * 60 * 60 * 1000)
                    }
                    disablePast
                    calendars={mode}
                    value={[checkIn, checkOut]}
                    maxDate={getWeeksAfter(checkIn, 8)}
                    onChange={newValue => {
                        setCheckIn(newValue[0]);
                        setCheckOut(newValue[1]);
                    }}
                    startText="Check-in"
                    endText="Check-out"
                    renderInput={(startProps, endProps) => {
                        if (endProps?.ref?.current?.children?.[1]?.children?.[1]) {
                            endProps.ref.current.children[1].children[1].style.border = '1px solid black';
                            endProps.ref.current.children[1].children[0].style.color = 'black';
                        }

                        if (startProps?.ref?.current?.children?.[1]?.children?.[1]) {
                            startProps.ref.current.children[1].children[1].style.border = '1px solid black';
                            startProps.ref.current.children[1].children[1].style['border-right'] = '0';
                        }
                        return (
                            <>
                                <TextField className="stay-details-start-date-picker" {...startProps} />
                                <TextField
                                    InputProps={{
                                        inputVariant: 'black',
                                        disableUnderline: true,
                                    }}
                                    className="stay-details-end-date-picker"
                                    {...endProps}
                                />
                            </>
                        );
                    }}
                />
            </LocalizationProvider>
        </ThemeProvider>
    );
}
