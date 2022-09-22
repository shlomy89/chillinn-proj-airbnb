import * as React from 'react'
import { Theme, useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useState } from 'react'
import { GuessPicker } from './guest-picker'
import { values } from 'lodash'
import { sumBy } from 'lodash'

export function Dropdown({ agesData, setAgesData }) {
    const onChange = (type, value) => {
        if (value < 0 || value > 10) {
            return
        }
        setAgesData((agesInfo) => ({
            ...agesInfo,
            [type]: { ...agesInfo[type], value }
        }))
    }

    const sumValues = sumBy(values(agesData), 'value')

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel>Guests</InputLabel>
                <Select
                    input={<OutlinedInput label='Guests' />}
                    renderValue={() => <span>{sumValues} guests</span>}
                    value={sumValues}
                    MenuProps={{ disableScrollLock: false }}
                >
                    {values(agesData).map(({ type, info, value }) => (
                        <GuessPicker
                            type={type}
                            info={info}
                            value={value}
                            onChange={onChange}
                            key={type}
                        />
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}
