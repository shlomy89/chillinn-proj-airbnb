import * as React from 'react'
import Slider, { SliderThumb } from '@mui/material/Slider'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { styled } from '@mui/material/styles'
import { useMemo, useState } from "react"
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'
import Link from '@mui/material/Link'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import _ from 'lodash'
import { ReactComponent as CloseIcon } from '../assets/img/icons/close-icon.svg'
import Apartment from '../assets/img/icons/apartment-icon.jpg'
import Guesthouse from '../assets/img/icons/guesthouse-icon.jpg'
import Hotel from '../assets/img/icons/hotel-icon.jpg'
import House from '../assets/img/icons/house-icon.jpg'

export const StayFilter = ({ getDefaultFilters, filter, setFilter, staysCount, handleClose }) => {

    const [localFilter, setLocalFilter] = useState(filter)

    const resetFilters = (ev) => {
        ev.preventDefault()
        // separation between StayFilter local state and stay app state
        // submiting only on demand
        setLocalFilter(getDefaultFilters())
    }

    const submit = (ev) => {
        ev.preventDefault()
        setFilter(localFilter)
        handleClose()
    }

    const handleFilters = (ev) => {
        setLocalFilter(prevFields => ({
            ...prevFields, [ev.target.name]: ev.target.value
        }))
    }

    const handleBedsButton = (ev) => {
        const bedrooms = ev.target.name
        const val = ev.target.value
        setLocalFilter(prevFields => ({
            ...prevFields, [bedrooms]: +val
        }))
    }

    const handlePtButton = (ev, propertyT) => {
        ev.preventDefault()
        const type = propertyT
        setLocalFilter(prevFields => ({
            ...prevFields,
            propertyTypes: {
                ...prevFields.propertyTypes,
                [type]: !prevFields.propertyTypes[type]
            }
        }))
    }

    const debouncedChangeHandler = useMemo(
        () => debounce(handleFilters, 500)
        , [])

    const handleCheckBox = ({ target }) => {
        const { id, checked, name } = target
        setLocalFilter(prevFields => ({
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
            [valueField]: localFilter[field],
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
        localFilter &&
        <React.Fragment>
            <header className="filter-header flex justify-space-between">
                <IconButton className="close-filter" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                <div className="filter-header-title flex align-center">
                    <div className="filter-modal-title">
                        Filters
                    </div>
                </div>
                <div className="right-space" />
            </header>
            <section className="filter-container">
                <form className='filter-form'>
                    <section className="price-slider inner-filter-container">
                        <h2 className="price-titel sub-titel" id="input-slider">
                            Price
                        </h2>
                        <AirbnbSlider
                            components={{ Thumb: AirbnbThumbComponent }}
                            min={0}
                            max={2000}
                            step={10}
                            {...getFieldProps('priceRange', 'range', true, true)}
                            valueLabelDisplay="auto" />
                    </section>

                    <section className="place-type inner-filter-container">
                        <h2 className="place-type-titel sub-titel">
                            Type of place
                        </h2>
                        {Object.keys(localFilter.placeTypes).map(placeT =>
                            <FormControlLabel
                                className='placeT-checkBox'
                                key={placeT}
                                label={placeT}
                                name='placeTypes'
                                onChange={handleCheckBox}
                                control={<Checkbox key={placeT} id={placeT} checked={localFilter.placeTypes[placeT]} />}
                            />
                        )}
                    </section>

                    <section className="rooms-btn inner-filter-container">
                        <h2 className="bedrooms-titel sub-titel">
                            Bedrooms
                        </h2>
                        {_.range(0, 9).map(n => (
                            <RoomButton
                                sx={{ borderRadius: 5, border: 1, borderColor: '#222222', marginInlineEnd: 1 }}
                                className={localFilter.bedrooms === n ? 'active' : ''}
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
                    </section>

                    <section className="property-type inner-filter-container">
                        <h2 className="property-titel sub-titel">
                            Property type
                        </h2>
                        <div className="property-buttons">
                            {Object.keys(localFilter.propertyTypes).map(propertyT => (
                                <button
                                    className={localFilter.propertyTypes[propertyT] ? 'active' : ''}
                                    onClick={(ev) => {
                                        handlePtButton(ev, propertyT)
                                    }}
                                    name="propertyType"
                                    value={propertyT}
                                    key={`property_${propertyT}`}
                                >
                                    <div className="inner-property-button flex column justify-space-between">
                                        <img className="property-img" src={propertyIcon[propertyT]} />
                                        <div className="inner-property-button-txt">{propertyT}</div>
                                    </div>
                                </button>
                            )
                            )}
                        </div>
                    </section>

                    <section className="amenities flex column inner-filter-container">
                        <div>
                            <h2 className="amenities-titel sub-titel">
                                Amenities
                            </h2>
                        </div>
                        <div className="amenities-list">
                            {Object.keys(localFilter.amenities).map(a =>
                                <FormControlLabel
                                    className='amenitie-checkBox'
                                    key={a}
                                    label={a}
                                    name='amenities'
                                    onChange={handleCheckBox}
                                    control={<Checkbox
                                        key={a}
                                        id={a}
                                        checked={localFilter.amenities[a]} />}
                                />
                            )}
                        </div>
                    </section>
                </form >
            </section >
            <footer className="filter-footer flex justify-space-between">
                <Link
                    component="button"
                    variant="body1"
                    color="#000000"
                    fontWeight="bold"
                    onClick={resetFilters}>
                    Clear all
                </Link>
                <Button
                    className="filter-btn"
                    onClick={submit}
                >
                    Show {staysCount} homes
                </Button>
            </footer>
        </React.Fragment>
    ) 
}