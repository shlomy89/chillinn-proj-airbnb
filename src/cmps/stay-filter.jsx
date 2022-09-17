import * as React from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import { useFormRegister } from '../hooks/useFormRegister'
import { useEffect } from "react"

export const StayFilter = (props) => {

    const [filter, setFilter] = React.useState({
        maxPrice: 2500,
        minPrice: 0,
        bedrooms: 0,
        propertyType: '',
        placeType: '',
        amenities: []
    })
    const [priceValue, setPriceValue] = React.useState([50, 1500])

    useEffect(() => {
        console.log('filter:', filter)
        props.onChangeFilter(filter)
    }, [filter])

    const handleFilters = (fields) => {
        setFilter(prevFields => ({ ...prevFields, ...fields }))
    }

    const handlePriceSlider = (ev, newValue) => {
        const [min, max] = newValue
        setPriceValue(newValue)
        setFilter(prevFields => ({ ...prevFields, minPrice: min, maxPrice: max }))
    }

    const handleCheckBox = (event) => {
        const amenitieType = event.target.defaultValue
        if (event.target.checked) {
            setFilter(prevFields => ({
                ...prevFields, amenities: [...filter.amenities, amenitieType]
            }))
        }

        if (!event.target.checked) {
            setFilter(prevFields => ({
                ...prevFields, amenities: prevFields.amenities.filter(a => a !== amenitieType)
            }))
        }
    }

    const [register] = useFormRegister({
        bedrooms: 0,
        propertyType: '',
        placeType: '',
    }, handleFilters)

    const classObj = { className: 'stay-filter' }
    const placeTypes = ["Entire place", "Privet room", "Shared room"]
    const propertyTypes = ["House", "Apartment", "Guesthouse", "Hotel"]
    const amenitiesList = [
        'TV',
        'Wifi',
        'Kitchen',
        'Dryer',
        'Washer',
        'Air conditioning',
        'Heating',
        'Iron',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics'
    ]

    const resetFilters = (ev) => {
        ev.preventDefault()
        setFilter(null)
    }

    // const AirbnbSlider = styled(Slider)(({ theme }) => ({
    //   color: '#3a8589',
    //   height: 3,
    //   padding: '13px 0',
    //   '& .MuiSlider-thumb': {
    //     height: 27,
    //     width: 27,
    //     backgroundColor: '#fff',
    //     border: '1px solid currentColor',
    //     '&:hover': {
    //       boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    //     },
    //     '& .airbnb-bar': {
    //       height: 9,
    //       width: 1,
    //       backgroundColor: 'currentColor',
    //       marginLeft: 1,
    //       marginRight: 1,
    //     },
    //   },
    //   '& .MuiSlider-track': {
    //     height: 3,
    //   },
    //   '& .MuiSlider-rail': {
    //     color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
    //     opacity: theme.palette.mode === 'dark' ? undefined : 1,
    //     height: 3,
    //   },
    // }))

    return (
        <section className='modal-container'>
        <form {...classObj} >
            <section className="price-slider-container">
                <Box sx={{ width: 300 }}>
                    <Typography id="input-slider">
                        Price:
                    </Typography>
                    <Slider
                        min={0}
                        max={2000}
                        step={10}
                        value={priceValue}
                        onChange={handlePriceSlider}
                        valueLabelDisplay="auto" />
                </Box>
            </section>
            <section className="rooms-slider-container">
                <Box sx={{ width: 300 }}>
                    <Typography id="input-slider">
                        Rooms:
                    </Typography>
                    <Slider
                        min={1}
                        max={8}
                        step={1}
                        marks
                        {...register('bedrooms', 'range')}
                        valueLabelDisplay="auto" />
                </Box>
            </section>
            <section className="place-type-container">
                <label htmlFor="placeType">Type of place</label>
                <select  {...register('placeType', 'text')}>
                    <option
                        key={placeTypes}
                        value="">
                        Any</option>
                    {placeTypes.map(placeType => <option
                        key={placeType}
                        value={placeType}>
                        {placeType}</option>)}
                </select>
            </section>
            <section className="property-type-container">
                <label htmlFor="propertyType">Property type</label>
                <select  {...register('propertyType', 'text')}>
                    <option
                        key={propertyTypes}
                        value="">
                        Any</option>
                    {propertyTypes.map(propertyType => <option
                        key={propertyType}
                        value={propertyType}>
                        {propertyType}</option>)}
                </select>
            </section>
            <section className="amenitie-container">
                <FormGroup>
                    {amenitiesList.map(amenitie =>
                        <FormControlLabel
                            onChange={handleCheckBox}
                            key={amenitie}
                            control={<Checkbox key={amenitie} value={amenitie} />}
                            label={amenitie} />
                    )}
                </FormGroup>
            </section>
            <button onClick={(ev) => resetFilters(ev)}>Reset filter</button>
        </form >
        </section>
    )
}