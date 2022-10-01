import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { GuestPicker } from './guest-picker';
import { sumBy, values } from 'lodash';

export function Dropdown({ agesData, setAgesData, capacity }) {
    const onChange = (type, value, operator) => {
        if (
            (value < 0 && operator === '-') ||
            (sumBy(values(agesData), 'value') + 1 > Math.min(capacity, 10) && operator === '+')
        ) {
            return;
        }
        setAgesData(agesInfo => ({
            ...agesInfo,
            [type]: { ...agesInfo[type], value },
        }));
    };

    const sumValues = sumBy(values(agesData), 'value');

    return (
        <FormControl sx={{ m: 0, width: '100%' }} className="guests-dropdown-picker">
            <InputLabel style={{ top: 20, color: 'black', borderTop: 0 }}>GUESTS</InputLabel>
            <Select
                input={<OutlinedInput style={{ paddingTop: 10 }} label="Guests" notched={false} />}
                renderValue={() => <span>{sumValues} guests</span>}
                value={sumValues}
                MenuProps={{ disableScrollLock: false }}
            >
                {values(agesData).map(({ type, info, value }) => (
                    <GuestPicker
                        type={type}
                        info={info}
                        value={value}
                        onChange={onChange}
                        capacity={capacity - sumBy(values(agesData), 'value')}
                        key={type}
                    />
                ))}
            </Select>
        </FormControl>
    );
}
