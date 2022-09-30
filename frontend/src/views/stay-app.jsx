import { useDispatch, useSelector } from 'react-redux'
import { StayList } from '../cmps/stay-list'
import FilterModal from '../cmps/filter-modal.jsx'
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { useSearchParams } from "react-router-dom"
import { loadStays, setFilterBy } from '../store/actions/stay.action'
import { FilterCarousel } from '../cmps/filter-carousel.jsx'

export const StayApp = () => {
    const { stays, isLoading } = useSelector(state => state.stayModule)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filter, setFilter] = useState()
    const dispatch = useDispatch()

    const getDefaultFilterState = () => {
        return {
            priceRange: [20, 1900],
            bedrooms: 0,
            bathrooms: 0,
            beds: 0,
            labels: '',
            propertyTypes: {
                'Apartment': false,
                'Guesthouse': false,
                'Hotel': false,
                'House': false,
            },
            placeTypes: {
                'Entire home/apt': false,
                'Private room': false,
                'Shared room': false
            },
            amenities: {
                'Wifi': false,
                'Iron': false,
                'Kitchen': false,
                'Air conditioning': false,
                'Beachfront': false,
                'Bed linens': false,
                'Building staff': false,
                'Carbon monoxide detector': false,
                'TV': false,
                'Cooking basics': false,
                '24-hour check-in': false,
                'Disabled parking spot': false,
                'Essentials': false,
                'Ethernet connection': false,
                'Extra pillows and blankets': false,
                'Family/kid friendly': false,
                'Fire extinguisher': false,
                'First aid kit': false,
                'Flat path to front door': false,
                'Ground floor access': false,
                'Hair dryer': false,
                'Hangers': false,
                'Hot tub': false,
                'Hot water': false,
                'Laptop friendly workspace': false,
                'Long term stays allowed': false,
                'Luggage dropoff allowed': false,
                'Pets allowed': false,
                'Private entrance': false,
                'Room-darkening shades': false,
                'Safety card': false,
                'Self check-in': false,
                'Shampoo': false,
                'Smoke detector': false,
                'Smoking allowed': false,
                'Suitable for events': false,
                'Water front': false,
                'Well-lit path to entrance': false,
                'Wide clearance to bed': false,
                'Wide entryway': false,
                'Wide hallway clearance': false
            }
        }
    }

    const getFiltersState = () => {
        if (searchParams && searchParams.has('encoded')) {
            const encoded = searchParams.get('encoded')
            if (encoded) {
                const decodedFilters = window.atob(encoded)
                if (decodedFilters) {
                    return JSON.parse(decodedFilters)
                }
            }
        }
        return getDefaultFilterState()
    }

    useEffect(() => {
        setFilter(getFiltersState())
    }, [])

    useEffect(() => {
        if (!filter) return
        dispatch(setFilterBy(filter))
        dispatch(loadStays())

        const serializedFilters = JSON.stringify(filter)
        const serializedBase64 = window.btoa(serializedFilters)

        setSearchParams({ encoded: serializedBase64 })
        console.log('filter:', filter)
    }, [filter])

    const getDefaultFilters = () => {
        return getDefaultFilterState()
    }

    return (
        <React.Fragment>
            <section className='filters-container flex justify-center align-center'>
                <FilterCarousel
                    setFilter={setFilter} />

                <FilterModal
                    staysCount={stays.length}
                    filter={filter}
                    setFilter={setFilter}
                    getDefaultFilters={getDefaultFilters} />
            </section>
        <div className='stay-app main-layout'>
            {isLoading ? (

                <Box sx={{ display: 'flex', margin: '100px auto' }}>
                    <CircularProgress />
                </Box>
            ) : (<StayList stays={stays} />)
            }
        </div>
        </React.Fragment>
    )
}