import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { stayService } from '../services/stay.service'
import { reviewService } from '../services/review.service'
import { Button } from '@mui/material'

import { Star } from '@mui/icons-material'
import { StarRating } from '../cmps/details-cmp/start-rating'
import { ActionButton } from '../cmps/details-cmp/action-button'
import { ReactComponent as HeartIcon } from '../../src/assets/img/icons/heart.svg'
import { ReactComponent as ShareIcon } from '../../src/assets/img/icons/share.svg'
import { ApartmentInfo } from '../cmps/details-cmp/apartment-info'
import { ReactComponent as DoorIcon } from '../../src/assets/img/icons/door-icon.svg'
import { ReactComponent as SuperHostIcon } from '../../src/assets/img/icons/super-host.svg'
import { ReactComponent as FreeCancellationIcon } from '../../src/assets/img/icons/free-cancellation.svg'
import { MainFeatures } from '../cmps/details-cmp/main-features'
import { ReactComponent as KitchenIcon } from '../../src/assets/img/icons/kitchen-icon.svg'
import { ReactComponent as TvIcon } from '../../src/assets/img/icons/tv-icon.svg'
import { ReactComponent as DryerIcon } from '../../src/assets/img/icons/dryer-icon.svg'
import { ReactComponent as HighChairIcon } from '../../src/assets/img/icons/high-chair-icon.svg'
import { ReactComponent as CarbonMonoxideAlarmIcon } from '../../src/assets/img/icons/carbon-monoxide-alarm-icon.svg'
import { ReactComponent as WifiIcon } from '../../src/assets/img/icons/wifi-icon.svg'
import { ReactComponent as WasherIcon } from '../../src/assets/img/icons/washer-icon.svg'
import { ReactComponent as AirConditioningIcon } from '../../src/assets/img/icons/air-conditioning-icon.svg'
import { ReactComponent as HairDryerIcon } from '../../src/assets/img/icons/hair-dryer-icon.svg'
import { ReactComponent as SmokeAlarmIcon } from '../../src/assets/img/icons/smoke-alarm-icon.svg'

// import { utilService } from "../services/util.service"

export const StayDetails = () => {
    const [stay, setStay] = useState(null)
    // const [nextStayId, setNextStayId] = useState(null)
    const [reviews, setReviews] = useState(null)
    // const [image, setImage] = useState("")

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const stayId = params.id
        stayService.getById(stayId).then((stay) => {
            // import(`../assets/img/${stay._id}.jpg`).then((imgData) => {
            //     setImage(imgData.default)
            // })
            // getNextStay(stay._id)
            console.log(stay)
            setStay(stay)
        })
        reviewService.query({ stayId }).then((reviews) => setReviews(reviews))
    }, [params.id])

    const onBack = () => {
        navigate('/')
    }

    // const getNextStay = (stayId) => {
    //     stayService.getNextId(stayId)
    //         .then(nextStayId => setNextStayId(nextStayId))
    // }

    const onRemoveReview = async (reviewId) => {
        try {
            await reviewService.remove(reviewId)
            const newReviews = reviews.filter(
                (review) => review._id !== reviewId
            )
            setReviews(newReviews)
        } catch (err) {
            console.log(err)
        }
    }
    console.log('hello stay details')
    console.log(stay)

    // if (!stay) return <div>Loading...</div>
    return (
        <div className='stay-details'>
            {/* <div className='title'>
                <h3>{stay.title}</h3>
            </div> */}
            <div className='container'>
                <StarRating rating={4.73} reviews={32} />
                <div className='share-like'>
                    <ActionButton text={'share'} Icon={ShareIcon} />
                    <ActionButton text={'save'} Icon={HeartIcon} />
                </div>
            </div>
            <section className='general-info'>
                <div className='apartment-info'>
                    <ApartmentInfo
                        text={'Self check-in'}
                        textInfo={'Check yourself in with the lockbox.'}
                        Icon={DoorIcon}
                    />
                    {/* <ApartmentInfo
                        text={'Veller Homes is a Superhost'}
                        textInfo={
                            'Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.'
                        }
                        Icon={SuperHostIcon}
                    />
                    <ApartmentInfo
                        text={'Free cancellation'}
                        Icon={FreeCancellationIcon}
                    /> */}
                </div>
            </section>
            <section className='amenities-container'>
                <div className='amenities-header'>What this place Offers</div>
                <MainFeatures text={'Kitchen'} Icon={KitchenIcon} />
                <MainFeatures text={'TV with standard cable'} Icon={TvIcon} />
                <MainFeatures text={'Dryer'} Icon={DryerIcon} />
                <MainFeatures text={'High chair'} Icon={HighChairIcon} />
                <MainFeatures
                    text={'Carbon monoxide alarm'}
                    Icon={CarbonMonoxideAlarmIcon}
                />
                <MainFeatures text={'Wifi'} Icon={WifiIcon} />
                <MainFeatures text={'Washer'} Icon={WasherIcon} />
                <MainFeatures
                    text={'Air conditioning'}
                    Icon={AirConditioningIcon}
                />
                <MainFeatures text={'Hair dryer'} Icon={HairDryerIcon} />
                <MainFeatures text={'Smoke alarm'} Icon={SmokeAlarmIcon} />
                <button className='show-all-amenities'>
                    Show all amenities{' '}
                </button>
            </section>
        </div>
    )
}

/*
<Button className='btn-back' variant="outlined" onClick={onBack}>Back</Button>
<section>
    <h3>Name: {stay.name}</h3>
</section>
<section>
    <h3>Price: {stay.price}</h3>
</section>
{/* <section>
    <h3>
        Labels:
        <ul>
            {stay.labels &&
                stay.labels.map((label) => <li key={label}>{label}</li>)}
        </ul>
    </h3>

</section> *}
<section>
    <h3>{stay.inStock ? '' : '(out of stock)'}</h3>
</section>
{/* <Link to={`/stay/${nextStayId}`}>
    <Button variant="outlined">Next Stay</Button>
</Link> *}
{/* <img src={image} alt="" /> *}
{reviews && <section className="stays-reviews">
    {reviews.map(review => (
        <article key={review._id}>
            <h3>{review.txt}</h3>
            <h3>Written by {review.user.firstname}</h3>
            {/* <h5>{utilService.getCreatedTime(review.createdAt)}</h5> *}
            <button onClick={() => onRemoveReview(review._id)}>Remove</button>
            <hr />
        </article>
    ))}
</section>}
*/
