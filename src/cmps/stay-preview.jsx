import { Link } from 'react-router-dom'
import { React, useState, useEffect } from 'react'
import { RatingRates } from './rating-rates'
import { utilService } from '../services/util.service.js'
import { ReactComponent as LikeHeartEmptyIcon } from '../assets/img/icons/like-heart-empty.svg'
import { ReactComponent as LikeHeartRedIcon } from '../assets/img/icons/like-heart-red.svg'


export function StayPreview({ stay, onRemoveStay, onAddReview }) {


    // const [image, setImage] = useState("")

    // useEffect(() => {
    //     import(`../assets/img/${stay._id}.jpg`).then((imgData) => {
    //         setImage(imgData.default)
    //     })
    // }, [])

    function onToggleLike(value) {
        console.log('🚀 ~ onToggleLike')
        // TODO: add/remove from wishlist
        // this.value = !value
        // this.innerText = <LikeHeartRedIcon/>
    }


    const { numberWithCommas } = utilService

    return (
        <div className='stay-preview'>
            <div className="like-icon"  onClick={() => { onToggleLike() }}>
                <LikeHeartEmptyIcon />
            </div>
            <Link to={`/stay/${stay._id}`} className='info'>
                <div className="gallery-container">
                    <img src={stay.imgUrls[0]} />
                </div>
                <div className="preview-details">
                    <div className="text rate"><RatingRates rating={4.73} reviews={32} /></div>
                    <div className='text name'>{stay.name}</div>
                    <div className='text location'>{stay.loc.city},&nbsp;{stay.loc.country}</div>
                    <div className='text capacity'>{stay.capacity}&nbsp;guests</div>
                    <div className='text price'>
                        <span className="full-night-price">${numberWithCommas(stay.price * 1.3)}</span>&nbsp;
                        <span className="night-price">${numberWithCommas(stay.price)} </span>
                        <span className="night">night ·</span>&nbsp;
                        <span className="full-price">${numberWithCommas(stay.price * 3)}</span>
                    </div>
                </div>
            </Link>
            {/* <button onClick={() => { onAddReview(stay._id) }}>Add review</button>
            <section className='actions'>
                <button onClick={() => onRemoveStay(stay._id)}>Delete</button>
                <Link to={`/stay/edit/${stay._id}`} >Edit</Link>
            </section> */}
        </div>
    )
}
