import { useDispatch, useSelector } from 'react-redux'
import { StayList } from '../cmps/stay-list'
import { reviewService } from '../services/review.service'
import FilterModal from '../cmps/filter-modal.jsx'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { useSearchParams } from "react-router-dom"
import {
    loadStays,
    removeStay,
    setFilterBy
} from '../store/actions/stay.action'

export const StayApp = () => {
    const { stays, isLoading } = useSelector(state => state.stayModule)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filter, setFilter] = useState()
    const dispatch = useDispatch()

    const getDefaultState = () => {
        return {
            priceRange: [20, 1900],
            bedrooms: 0,
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
                const decodedFilters = atob(encoded)
                if (decodedFilters) {
                    return JSON.parse(decodedFilters)
                }
            }
        }
        return getDefaultState()
    }

    useEffect(() => {
        if (!filter) {
            return
        }
        
        dispatch(setFilterBy(filter))
        dispatch(loadStays())

        const serializedFilters = JSON.stringify(filter)
        const serializedBase64 = btoa(serializedFilters)

        setSearchParams({ encoded: serializedBase64 })
    }, [filter])

    useEffect(() => {
        setFilter(getFiltersState())
    }, [])

    const onRemoveStay = (stayId) => {
        dispatch(removeStay(stayId))
    }

    const onSetLikeBtn = () => {
        // dispatch(setLikeBtn())
    }

    const onAddReview = async (stayId) => {
        const txt = prompt('Write the review here')
        try {
            const review = await reviewService.add({ txt, stayId })
        } catch (err) {
            console.error(err)
        }
    }

    const resetFilters = (ev) => {
        ev.preventDefault()
        setFilter(getDefaultState())
    }
    
    return (
        <div className='stay-app'>
            <FilterModal
                resetFilters={resetFilters}
                filter={filter}
                setFilter={setFilter}
                staysCount={stays.length} />

            {isLoading ? (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            ) : (<StayList onSetLikeBtn={onSetLikeBtn} stays={stays} />)
            }
        </div>
    )
}
