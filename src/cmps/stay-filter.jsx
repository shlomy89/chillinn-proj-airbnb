import * as React from 'react'
import Box from '@mui/material/Box'
import Slider, { SliderThumb } from '@mui/material/Slider'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useEffect, useMemo } from "react"
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import _ from 'lodash'


function AirbnbThumbComponent(props) {
    const { children, ...other } = props
    return (
        <SliderThumb {...other}>
            {children}
            <span className="airbnb-bar" />
            <span className="airbnb-bar" />
            <span className="airbnb-bar" />
        </SliderThumb>
    )
}

AirbnbThumbComponent.propTypes = {
    children: PropTypes.node,
}

export const StayFilter = ({ onChangeFilter }) => {

    const getDefaultState = () => {
        return {
            priceRange: [50, 1500],
            bedrooms: 0,
            propertyType: '',
            placeType: '',
            amenities: {
                'TV': false,
                'Wifi': false,
                'Kitchen': false,
                'Dryer': false,
                'Washer': false,
                'Air conditioning': false,
                'Heating': false,
                'Iron': false,
                'Smoking allowed': false,
                'Pets allowed': false,
                'Cooking basics': false
            }
        }
    }

    const placeTypes = ["Entire place", "Private room", "Shared room"]
    const propertyTypes = ["House", "Apartment", "Guesthouse", "Hotel"]
    const [filter, setFilter] = React.useState(getDefaultState())

    useEffect(() => {
        onChangeFilter(filter)
    }, [filter])
    
    const handleFilters = (ev) => {
        setFilter(prevFields => ({
            ...prevFields, [ev.target.name]: ev.target.value
        }))
    }

    // Used to convert from string to integer before assignment
    const handleButtonGroup = (ev) => {
        setFilter(prevFields => ({
            ...prevFields, [ev.target.name]: +ev.target.value
        }))
    }

    const debouncedChangeHandler = useMemo(
        () => debounce(handleFilters, 300)
        , [])

    const handleCheckBox = (event) => {
        const amenitieType = event.target.id
        setFilter(prevFields => ({
            ...prevFields,
            amenities: {
                ...prevFields.amenities,
                [amenitieType]: event.target.checked
            }
        }))
    }

    const resetFilters = (ev) => {
        ev.preventDefault()
        setFilter(getDefaultState())
    }

    const getFieldProps = (field, type, useDefaultValue, debounce) => {
        const valueField = useDefaultValue ? 'defaultValue' : 'value'
        const onChange = debounce ? debouncedChangeHandler : handleFilters

        return {
            onChange,
            name: field,
            id: field,
            [valueField]: filter[field],
            type
        }
    }

    const AirbnbSlider = styled(Slider)(({ theme }) => ({
        color: '#3a8589',
        height: 3,
        padding: '13px 0',
        '& .MuiSlider-thumb': {
            height: 27,
            width: 27,
            backgroundColor: '#fff',
            border: '1px solid currentColor',
            '&:hover': {
                boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
            },
            '& .airbnb-bar': {
                height: 9,
                width: 1,
                backgroundColor: 'currentColor',
                marginLeft: 1,
                marginRight: 1,
            },
        },
        '& .MuiSlider-track': {
            height: 3,
        },
        '& .MuiSlider-rail': {
            color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
            opacity: theme.palette.mode === 'dark' ? undefined : 1,
            height: 3,
        },
    }))

    return (
        <section className='modal-container'>
            <form>
                <section className="price-slider-container">
                    <Box sx={{ width: 300 }}>
                        <Typography id="input-slider">
                            Price:
                        </Typography>
                        <AirbnbSlider
                            components={{ Thumb: AirbnbThumbComponent }}
                            getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
                            min={0}
                            max={2000}
                            step={10}
                            {...getFieldProps('priceRange', 'range', true, true)}
                            valueLabelDisplay="auto" />
                    </Box>
                </section>
                <section className="rooms-slider-container">
                    <Box sx={{ width: 300 }}>
                        <Typography id="input-slider">
                            Rooms:
                        </Typography>
                        <ButtonGroup
                            disableElevation
                            variant="contained"
                            name="bedrooms"
                            id="bedrooms"
                            type="number"
                            onClick={handleButtonGroup}
                        >
                            {_.range(0, 9).map(n => (
                                // button[name='bedrooms'].active {}
                                <Button className={filter.bedrooms === n ? 'active' : ''} name="bedrooms" value={n} key={`room_${n}`}>
                                    {n === 0 ? 'Any' : n}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </Box>
                </section>
                <section className="place-type-container">
                    <label htmlFor="placeType">Type of place</label>
                    <select {...getFieldProps('placeType', 'text')}>
                        <option key={placeTypes} value="">Any</option>
                        {placeTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </section>
                <section className="property-type-container">
                    <label htmlFor="propertyType">Property type</label>
                    <select {...getFieldProps('propertyType', 'text')}>
                        <option
                            key={propertyTypes}
                            value="">Any</option>
                        {propertyTypes.map(propertyType => (
                            <option
                                key={propertyType}
                                value={propertyType}>
                                {propertyType}
                            </option>
                        ))}
                    </select>
                </section>
                <section className="amenitie-container">
                    <FormGroup>
                        {Object.keys(filter.amenities).map(amenitie =>
                            <FormControlLabel
                                onChange={handleCheckBox}
                                key={amenitie}
                                control={<Checkbox key={amenitie} id={amenitie} checked={filter.amenities[amenitie]} />}
                                label={amenitie} />
                        )}
                    </FormGroup>
                </section>
                <button onClick={(ev) => resetFilters(ev)}>Reset filter</button>
            </form >
        </section>
    )
}