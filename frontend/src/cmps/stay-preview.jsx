import { Link } from 'react-router-dom'
import { React, useState } from 'react'
import { RatingRates } from './rating-rates'
import { utilService } from '../services/util.service.js'
import { ReactComponent as LikeHeartEmptyIcon } from '../assets/img/icons/like-heart-empty.svg'
import { ReactComponent as LikeHeartRedIcon } from '../assets/img/icons/like-heart-red.svg'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

export function StayPreview({ stay }) {
    const { numberWithCommas, getRandomIntInclusive } = utilService

    const [likeClicked, setLikeClicked] = useState(false)

    function getBedsNum() {
        switch (stay.capacity) {
            case 1:
                return '1 bed'
            case 2:
                return '1 queen bed'
            default:
                return stay.capacity + ' beds'
        }
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
                <Carousel className='carousel' showThumbs={false} infiniteLoop>
                    {stay.imgUrls.map((url, index) => (
                        <img key={index} src={url} />
                    ))}
                </Carousel>
                {/* <img src={stay.imgUrls[0]} /> */}
            </div>
            <Link to={`/stay/${stay._id}`} className='info'>
                <div className='preview-details'>
                    <div className='text rate'>
                        <RatingRates
                            rating={getRandomIntInclusive(1, 5)}
                            reviews={32}
                        />
                    </div>
                    <div className='text name'>{stay.name}</div>
                    <div className='text summary'>{stay.summary}</div>
                    <div className='text capacity'>{getBedsNum()}</div>
                    <div className='text price'>
                        <span className='full-night-price'>
                            ${numberWithCommas(stay.price * 1.3)}
                        </span>
                        &nbsp;
                        <span className='night-price'>
                            ${numberWithCommas(stay.price)}{' '}
                        </span>
                        <span className='night'>night</span>
                        {/* <span className="dot"> · </span> */}
                        {/* <span className="night">total</span> */}
                    </div>
                </div>
            </Link>
        </div>
    )
}
