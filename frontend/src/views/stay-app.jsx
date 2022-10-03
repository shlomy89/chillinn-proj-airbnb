import { useDispatch, useSelector } from 'react-redux'
import { StayList } from '../cmps/stay-list'
import FilterModal from '../cmps/filter-modal.jsx'
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { useSearchParams } from "react-router-dom"
import { loadStays, setFilterBy } from '../store/actions/stay.action'
import { FilterCarousel } from '../cmps/filter-carousel.jsx'
import _ from 'lodash'

export const StayApp = () => {

    const { stays, isLoading } = useSelector(state => state.stayModule)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filter, setFilter] = useState()
    const [activeFilters, setActiveFilters] = useState()
    const [isStuck, setIsStuck] = useState(false)

    const dispatch = useDispatch()

    const getDefaultFilterState = () => {
        return {
            amenities: {},
            bathrooms: 0,
            bedrooms: 0,
            beds: 0,
            labels: '',
            placeTypes: {},
            propertyTypes: {},
            priceRange: [0, Infinity]
        }
    }

    const getFiltersState = () => {
        if (searchParams && searchParams.has('filters')) {
            let urlFilters = searchParams.get('filters')
            if (urlFilters) {
                urlFilters = JSON.parse(urlFilters)
                if (!urlFilters.priceRange[1]) urlFilters.priceRange[1] = Infinity
                return urlFilters
            }
        }
        return getDefaultFilterState()
    }

    const onScroll = () => {
        const posY = window.scrollY
        if (posY > 20) {
            if (!isStuck) {
                setIsStuck(true)
            }
        } else {
            setIsStuck(false)
        }
    }

    useEffect(() => {
        setFilter(getFiltersState())
        document.addEventListener('scroll', onScroll, true)

        return function cleanup() {
            document.removeEventListener('scroll', onScroll, true)
        }
    }, [])

    useEffect(() => {
        if (!filter) return
        dispatch(setFilterBy(filter))
        dispatch(loadStays())

        const serializedFilters = JSON.stringify(filter)
        setSearchParams({ filters: serializedFilters })
        activeFiltersCount()
    }, [filter])

    const activeFiltersCount = () => {
        let counter = null
        const activeFilters = ['beds', 'bathrooms', 'bedrooms']
        const activeArrFilters = ['amenities', 'propertyTypes', 'placeTypes', 'priceRange']
        const defultState = getDefaultFilterState()
        activeFilters.forEach(a => (defultState[a] !== filter[a]) && counter++)
        activeArrFilters.forEach(a => (!_.isEqual(defultState[a], filter[a])) && counter++)
        setActiveFilters(counter)
    }

    return (
        <React.Fragment>
            <section className={`filters-container flex align-center ${isStuck ? 'stuck' : ''}`}>
                <div className='filters-container-background'>
                    <div className="main-layout">
                        <div className='filters-container-wrapper flex align-center'>
                            <FilterCarousel
                                filter={filter}
                                setFilter={setFilter} />
                            <FilterModal
                                staysCount={stays.length}
                                counter={activeFilters}
                                filter={filter}
                                setFilter={setFilter}
                                getDefaultFilterState={getDefaultFilterState} />
                        </div>
                    </div>
                </div>
            </section>
            <div className='stay-app main-layout'>
                {isLoading ? (
                    <Box sx={{ display: 'flex', margin: '100px auto' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <StayList stays={stays} />
                )
                }
            </div>
        </React.Fragment>
    )
}