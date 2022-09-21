import * as React from 'react'
import Slider, { SliderThumb } from '@mui/material/Slider'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useMemo } from "react"
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import _ from 'lodash'
import Divider from '@mui/material/Divider'
import Apartment from '../assets/img/icons/apartment-icon.jpg'
import Guesthouse from '../assets/img/icons/guesthouse-icon.jpg'
import Hotel from '../assets/img/icons/hotel-icon.jpg'
import House from '../assets/img/icons/house-icon.jpg'

export const StayFilter = ({ resetFilters, filter, setFilter, staysCount, handleClose }) => {

    const handleFilters = (ev) => {
        setFilter(prevFields => ({
            ...prevFields, [ev.target.name]: ev.target.value
        }))
    }

    const handleBedsButton = (ev) => {
        const bedrooms = ev.target.name
        const val = ev.target.value
        setFilter(prevFields => ({
            ...prevFields, [bedrooms]: +val
        }))
    }

    const handlePtButton = (propertyT) => {
        const type = propertyT
        setFilter(prevFields => ({
            ...prevFields,
            propertyTypes: {
                ...prevFields.propertyTypes,
                [type]: !prevFields.propertyTypes[type]
            }
        }))
    }

    const debouncedChangeHandler = useMemo(
        () => debounce(handleFilters, 300)
        , [])

    const handleCheckBox = ({ target }) => {
        const { id, checked, name } = target
        setFilter(prevFields => ({
            ...prevFields,
            [name]: {
                ...prevFields[name],
                [id]: checked
            }
        }))
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

    const RoomButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText('#ffffff'),
        backgroundColor: '#ffffff00',
        '&:hover': {
            backgroundColor: '#000000',
            color: theme.palette.getContrastText('#000000'),
        },
    }))

    const propertyIcon = {
        House,
        Hotel,
        Apartment,
        Guesthouse
    }

    return (
        filter &&
        <form className='filter-container'>
            <section className="price-slider">
                <Typography className="price-titel titel" id="input-slider">
                    Price:
                </Typography>
                <AirbnbSlider
                    components={{ Thumb: AirbnbThumbComponent }}
                    min={0}
                    max={2000}
                    step={10}
                    {...getFieldProps('priceRange', 'range', true, true)}
                    valueLabelDisplay="auto" />
                <Divider className="divider" />
            </section>

            <section className="place-type">
                <Typography className="place-type-titel titel">
                    Type of place:
                </Typography>
                {Object.keys(filter.placeTypes).map(placeT =>
                    <FormControlLabel
                        className='placeT-checkBox'
                        key={placeT}
                        label={placeT}
                        name='placeTypes'
                        onChange={handleCheckBox}
                        control={<Checkbox key={placeT} id={placeT} checked={filter.placeTypes[placeT]} />}
                    />
                )}
                <Divider className="divider" />
            </section>

            <section className="rooms-btn">
                <Typography className="bedrooms-titel titel">
                    Bedrooms:
                </Typography>
                {_.range(0, 9).map(n => (
                    <RoomButton
                        sx={{ borderRadius: 5, border: 1, borderColor: '#222222', marginInlineEnd: 1 }}
                        className={filter.bedrooms === n ? 'active' : ''}
                        value={n}
                        id="bedrooms"
                        type="number"
                        name="bedrooms"
                        key={`room_${n}`}
                        onClick={handleBedsButton}
                    >
                        {n === 0 ? 'Any' : n}
                    </RoomButton>
                ))}
                <Divider className="divider" />
            </section>

            <section className="property-type">
                <Typography className="property-titel titel">
                    Property type:
                </Typography>
                {Object.keys(filter.propertyTypes).map(propertyT => (
                    <Button
                        sx={{ borderRadius: 2, border: 1, borderColor: '#222222', marginInlineEnd: 1, }}
                        className={filter.propertyTypes[propertyT] ? 'active' : ''}
                        onClick={() => {
                            handlePtButton(propertyT)
                        }}
                        name="propertyType"
                        value={propertyT}
                        key={`property_${propertyT}`}
                    >
                        <img src={propertyIcon[propertyT]} />&nbsp;
                        <div>{propertyT}</div>
                    </Button>
                )
                )}
                <Divider className="divider" />
            </section>

            <section className="amenities">
                <Typography className="amenities-titel titel">
                    Amenities:
                </Typography>
                {Object.keys(filter.amenities).map(a =>
                    <FormControlLabel
                        className='amenitie-checkBox'
                        key={a}
                        label={a}
                        name='amenities'
                        onChange={handleCheckBox}
                        control={<Checkbox
                            key={a}
                            id={a}
                            checked={filter.amenities[a]} />}
                    />
                )}
            </section>
            <div className="filter-footer">
                <Link
                    component="button"
                    variant="body1"
                    color="#000000"
                    fontWeight="bold"
                    onClick={(ev) => resetFilters(ev)}>
                    Clear all
                </Link>
                <Button
                    className="filter-btn"
                    onClick={() => handleClose()}
                > 
                    Show {staysCount} homes
                </Button>
            </div>
        </form >
    )
}