import React from 'react'
import { useState, useEffect } from 'react'
import AliceCarousel from 'react-alice-carousel'
import nextIcon from '../assets/img/icons/right-arrow.svg'
import prevIcon from '../assets/img/icons/left-arrow.svg'

export const FilterCarousel = ({ setFilter, filter }) => {
    const typeList = [
        'A-frames',
        'Amazing pools',
        'Amazing views',
        'Arctic',
        'Barns',
        'Beach',
        'Beachfront',
        'Bed & breakfasts',
        'Boats',
        'Cabins',
        'Campers',
        'Camping',
        'Castles',
        'Caves',
        "Chef's kitchens",
        'Containers',
        'Countryside',
        'Creative spaces',
        'Dammusos',
        'Desert',
        'Desidn',
        'Domes',
        // 'Earth homes',
        // 'Farms',
        // 'Golfing',
        // 'Grand pianos',
        // 'Historical homes',
        // 'Islands',
        // 'Lake',
        // 'Lakefront',
        // 'Luxe',
        // 'Mansions',
        // 'Minsus',
        // 'National parks',
        // 'OMG',
        // 'Riads',
        // 'Ryokans',
        // 'Shared homes',
        // 'Skiing',
        // 'Ski-in-out',
        // 'Surfing',
        // 'Tiny homes',
        // 'Towers',
        // 'Tree houses',
        // 'Trolli',
        // 'Tropical',
        // 'Vineyards',
        // 'Windmills',
        // 'Yurts'
    ]

    const [icons, setIcons] = useState({})
    const [items, setItems] = useState([])
    const [activeType, setActiveType] = useState()

    useEffect(() => {
        if (filter) {
            if (filter.labels) {
                setActiveType(filter.labels)
            }
        }
    }, [filter])

    useEffect(() => {
        getIcons()
            .then(icons => {
                return setIcons(icons)
            })
    }, [])

    useEffect(() => {
        const items = typeList.map(t => {
            const img = icons[t]

            return (
                <button
                    id={t}
                    className={`${activeType === t ? 'active' : ''} icon-btn flex column justify-center align-center`}
                    onClick={handleClick}>
                    <img
                        alt='icon'
                        className='icon-carousel'
                        src={img}
                        id={t}
                        role="presentation" />
                    <div className='type-container flex column justify-center align-center'>
                        <span className='type'>{t}</span>
                        <div className='hover-border' />
                    </div>
                </button>
            )
        })

        setItems(items)
    }, [icons, activeType])

    const renderNextButton = ({ isDisabled }) => {
        return (
            <button
                className={`next-btn ${isDisabled ? 'disabled' : ''}`}>
                <img alt='' src={nextIcon} className="alice-carousel__next-btn-item" />
            </button >
        )
    }

    const renderPrevButton = ({ isDisabled }) => {
        return (
            <button
                className={`prev-btn ${isDisabled ? 'disabled' : ''}`}>
                <img alt='' src={prevIcon} className="alice-carousel__prev-btn-item" />
            </button>
        )
    }

    const getIcons = () => {
        const promises = []
        const icons = {}

        typeList.forEach(t => {
            (function (t) {
                const prom = import(`../assets/img/filter-carousel-icon/${t}.jpg`)
                    .then(img => [t, img.default])
                promises.push(prom)
            }(t))
        })

        return Promise.all(promises)
            .then((results) => {
                results.forEach(res => {
                    icons[res[0]] = res[1]
                })
                return icons
            })
    }

    const toggleActiveType = (type) => {
        if (activeType === type) setActiveType('')
        else setActiveType(type)
    }

    useEffect(() => {
        setFilter((prevFields) => ({
            ...prevFields,
            labels: activeType
        }))
    }, [activeType])

    const handleClick = (ev) => {
        ev.preventDefault()
        const type = ev.target.id
        toggleActiveType(type)
    }

    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 10 }
    }

    return (
        items && <section className='filter-carousel-container'>
            <AliceCarousel
                responsive={responsive}
                controlsStrategy='responsive'
                disableDotsControls
                items={items}
                renderPrevButton={renderPrevButton}
                renderNextButton={renderNextButton}
            />
        </section>
    )
}