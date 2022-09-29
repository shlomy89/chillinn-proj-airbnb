import React from 'react'
import { useState, useEffect } from 'react'
import AliceCarousel from 'react-alice-carousel'
import nextIcon from '../assets/img/icons/right-arrow.svg'
import prevIcon from '../assets/img/icons/left-arrow.svg'

export const FilterCarousel = ({ setFilter }) => {
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
        'Earth homes',
        'Farms',
        'Golfing',
        'Grand pianos',
        'Historical homes',
        'Islands',
        'Lake',
        'Lakefront',
        'Luxe',
        'Mansions',
        'Minsus',
        'National parks',
        'OMG',
        'Riads',
        'Ryokans',
        'Shared homes',
        'Skiing',
        'Ski-in-out',
        'Surfing',
        'Tiny homes',
        'Towers',
        'Tree houses',
        'Trolli',
        'Tropical',
        'Vineyards',
        'Windmills',
        'Yurts'
    ]

    const [icon, setIcon] = useState([])
    const [activeType, setActiveType] = useState()

    useEffect(() => {
        getIcon()
    }, [])

    const getIcon = async () => {
        let iconUrl = []
        typeList.map((t) => {
            import(`../assets/img/filter-carousel-icon/${t}.jpg`).then(
                (imgData) => iconUrl.push(imgData.default)
            )
        })
        setIcon(iconUrl)
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
        console.log('activeType:', activeType)
    }, [activeType])

    const handleClick = (ev) => {
        ev.preventDefault()
        const type = ev.target.id
        toggleActiveType(type)
    }

    const items = icon.map((i, idx) => {
        return (
            <section className='icon-carousel-wrapper flex column justify-center align-center'>
                <button
                    id={typeList[idx]}
                    className={`${activeType === typeList[idx] ? 'active' : ''} icon-btn flex column justify-center align-center`}
                    onClick={handleClick}>
                    <img
                        className='icon-carousel'
                        src={i}
                        id={typeList[idx]}
                        role="presentation" />
                    <div className='type-container flex column justify-center align-center'>
                        <span className='type'>{typeList[idx]}</span>
                        <div className='hover-border' />
                    </div>
                </button>
            </section>
        )
    })

    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 10 }
    }

    return (
        <section className='filter-carousel-container'>
            <AliceCarousel
                responsive={responsive}
                controlsStrategy='alternate'
                disableDotsControls={true}
                items={items} 
                innerWidth={1}
                paddingLeft={40}
                paddingRight={40}
                renderPrevButton={() => {
                    return <button className="prev-btn">
                        <img src={prevIcon} className="alice-carousel__prev-btn-item" />
                        </button>
                  }}
                  renderNextButton={() => {
                    return <button  className="next-btn">
                        <img src={nextIcon} className="alice-carousel__next-btn-item" />
                        </button>
                  }}
        
                />
        </section>
    )
}
