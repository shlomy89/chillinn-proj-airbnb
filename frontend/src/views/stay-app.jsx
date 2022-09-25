import { useDispatch, useSelector } from 'react-redux'
import { StayList } from '../cmps/stay-list'
import FilterModal from '../cmps/filter-modal.jsx'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { useSearchParams } from "react-router-dom"
import { loadStays, setFilterBy } from '../store/actions/stay.action'
import {FilterCarousel} from '../cmps/filter-carousel.jsx'

export const StayApp = () => {
    const { stays, isLoading } = useSelector(state => state.stayModule)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filter, setFilter] = useState()
    const dispatch = useDispatch()

    const getDefaultFilterState = () => {
        return {
            priceRange: [20, 1900],
            bedrooms: 0,
            labels: {
                'Islands': false,
                'Desidn': false,
                'Arctic': false,
                'Surfing': false,
                'Domes': false,
                'OMG': false,
                'Beach': false,
                'Amazing pool': false,
                'National parks': false,
                'Cabins': false,
                'Campers': false,
                'Amazing views': false,
                'Lakefront': false,
                'Tiny homes': false,
                'Desert': false,
                'A-frames': false,
                'Caves': false,
                'Tropical': false,
                'Shared homes': false,
                'Earth homes': false,
                'Iconic cities': false,
                'Bed & breakfasts': false,
                'Luxe': false,
                'Farms': false,
                'Counrtyside': false,
                'Castles': false,
                'Historical homes': false,
                'Skiing': false,
                'Yurts': false,
                'Golfing': false,
                'Beachfront': false,
                'Vineyards': false,
                'Towers': false,
                'Containers': false,
            },
            propertyTypes: {
                'House': false,
                'Apartment': false,
                'Guesthouse': false,
                'Hotel': false
            },
            placeTypes: {
                'Entire home/apt': false,
                'Private room': false,
                'Shared room': false
            },
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
                'Cooking basics': false,
                'Cable TV': false,
                'Internet': false,
                'Wheelchair accessible': false,
                'Pool': false,
                'Free parking on premises': false,
                'Doorman': false,
                'Gym': false,
                'Elevator': false
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
    }, [filter])

    const getDefaultFilters = () => {
        return getDefaultFilterState()
    }

    return (
        <div className='stay-app main-layout'>
            <FilterModal
                getDefaultFilters={getDefaultFilters}
                filter={filter}
                setFilter={setFilter}
                staysCount={stays.length} />
                <FilterCarousel filter={filter} />

            {isLoading ? (

                <Box sx={{ display: 'flex', margin: '100px auto' }}>
                    <CircularProgress />
                </Box>
            ) : (<StayList stays={stays} />)
            }
        </div>
    )
}