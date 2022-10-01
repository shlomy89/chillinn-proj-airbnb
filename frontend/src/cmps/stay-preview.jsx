import { Link, useNavigate } from 'react-router-dom'

import { React, useState, useEffect, useRef } from 'react'
import { RatingRates } from './rating-rates'
import { utilService } from '../services/util.service.js'
import { ReactComponent as LikeHeartEmptyIcon } from '../assets/img/icons/like-heart-empty.svg'
import { ReactComponent as LikeHeartRedIcon } from '../assets/img/icons/like-heart-red.svg'
import { Carousel } from 'react-responsive-carousel'

export function StayPreview({ stay }) {

    const {
        numberWithCommas,
        getRandomIntInclusive,
        getRandomFloatInclusive,
        randomBoolean
    } = utilService

    const navigate = useNavigate()

    const [likeClicked, setLikeClicked] = useState(false)

    const ilLat = 31.77, ilLng = 35.21
    const distance = (Math.sqrt(Math.pow(stay.loc.lat - ilLat, 2) + Math.pow(stay.loc.lat - ilLng, 2)) * 100).toFixed(0)

    const rating = useRef(getRandomFloatInclusive(4, 5, 1))
    const reviews = useRef(getRandomIntInclusive(1, 20))
    const boolean = useRef(randomBoolean())

    function onClickItem(stayId) {
        window.scrollTo(0, 0)
        navigate(`/stay/${stayId}`)
    }

    return (
        <div className='stay-preview'>
            <div
                className='like-icon'
                onClick={() => {
                    setLikeClicked(!likeClicked)
                }}
            >
                {likeClicked ? <LikeHeartRedIcon /> : <LikeHeartEmptyIcon />}
            </div>
            <div className='gallery-container'>
                <Carousel className='carousel'
                    showThumbs={false}
                    onClickItem={() => onClickItem(stay._id)}>
                    {stay.imgUrls.map((url, index) => (
                        <img key={index} src={url} />
                    ))}
                </Carousel>
            </div>
            <Link to={`/stay/${stay._id}`} className='info'>
                <div className='preview-details'>
                    <div className='text rate'>
                        <RatingRates
                            rating={rating.current}
                            reviews={reviews.current}
                        />
                    </div>
                    <div className="details">
                        <div className='text loc'>{stay.propertyType} in {stay.loc.city}</div>
                        <div className='text summary'>{stay.summary}</div>
                        <div className='text distance'>{numberWithCommas(distance)} kilometers</div>
                        <div className='text price'>
                            {boolean.current &&
                                <span className='full-night-price'>
                                    ${numberWithCommas((stay.price * 1.3).toFixed())}&nbsp;
                                </span>}
                            <span className='night-price'>
                                ${numberWithCommas(stay.price)}&nbsp;
                            </span>
                            <span className='night'>night</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}