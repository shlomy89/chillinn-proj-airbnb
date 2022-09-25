import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { stayService } from '../services/stay.service'
import { reviewService } from '../services/review.service'
import { StarRating } from '../cmps/details-cmp/start-rating'
import { ActionButton } from '../cmps/details-cmp/action-button'
import { ReactComponent as HeartIcon } from '../../src/assets/img/icons/heart-icon.svg'
import { ReactComponent as ShareIcon } from '../../src/assets/img/icons/share-icon.svg'
import { ApartmentInfo } from '../cmps/details-cmp/apartment-info'
import { ReactComponent as DoorIcon } from '../../src/assets/img/icons/door-icon.svg'
import { IconText } from '../cmps/details-cmp/icon-text'
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
import { Review } from '../cmps/details-cmp/review'
import { ReactComponent as CheckInOutIcon } from '../../src/assets/img/icons/check-in-out-icon.svg'
import { ReactComponent as NoSmokingIcon } from '../../src/assets/img/icons/no-smoking-icon.svg'
import { ReactComponent as NoPartiesIcon } from '../../src/assets/img/icons/no-parties-icon.svg'
import { ReactComponent as PetsAreAllowedIcon } from '../../src/assets/img/icons/pets-are-allowed-icon.svg'
// import { ShowMoreButton } from '../cmps/details-cmp/show-more-button'
import { ReactComponent as HealthCheckIcon } from '../../src/assets/img/icons/health-check-icon.svg'
import { ReactComponent as SmokingAlarmIcon } from '../../src/assets/img/icons/smoking-alarm-icon.svg'
import { ThingToKnow } from '../cmps/details-cmp/thing-to-know'
import { ReservationCard } from '../cmps/details-cmp/reservation-card'
import { AirCover } from '../cmps/details-cmp/air-cover'
import { ReviewStats } from '../cmps/details-cmp/Review-stats'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { addReview } from '../store/actions/review.actions'
import { useDispatch } from 'react-redux'

export const StayDetails = () => {
    const dispatch = useDispatch()
    const [stay, setStay] = useState(null)
    const [reviews, setReviews] = useState(null)
    const [review, setReview] = useState({ text: '', rating: 0 })
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const stayId = params.id
        const getReviews = async () => {
            const stay = await stayService.getById(stayId)
            setStay(stay)
            const reviews = await reviewService.query({ stayId })
            console.log({ reviews })
            setReviews(reviews)
        }
        getReviews()
    }, [params.id])

    // const onBack = () => {

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

    const onAddReview = async () => {
        dispatch(addReview({ ...review, stayId: stay._id }))
    }
    // const onRemoveReview = async (reviewId) => {
    //     try {
    //         await reviewService.remove(reviewId)
    //         const newReviews = reviews.filter(
    //             (review) => review._id !== reviewId
    //         )
    //         setReviews(newReviews)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    if (!stay) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <div className='stay-details narrow main-layout'>
            <div className='title'>
                <h3>{stay.name}</h3>
            </div>
            <div className='stay-apartment-location-header-container'>
                <div className='apartment-location-rating'>
                    <StarRating rating={4.73} reviews={32} />
                    <span>·</span>{' '}
                    <a className='apartment-location'>
                        {stay.loc.city}, {stay.loc.country}
                    </a>
                </div>
                <div className='share-like'>
                    <ActionButton text={'Share'} Icon={ShareIcon} />
                    <ActionButton text={'Save'} Icon={HeartIcon} />
                </div>
            </div>
            <div className='apartment-images-container'>
                <img className='main-apartment-image' src={stay.imgUrls[0]} />
                <div className='apartment-secondary-images'>
                    <img src={stay.imgUrls[1]} />
                    <img src={stay.imgUrls[2]} />
                </div>
                <div className='apartment-secondary-images'>
                    <img className='border-top' src={stay.imgUrls[3]} />
                    <img className='border-bottom' src={stay.imgUrls[4]} />
                </div>
            </div>
            <div className='stay-details-content-container'>
                <div className='stay-details-content'>
                    <section className='general-info'>
                        <div className='apartment-secondary-info'>
                            <div className='apartment-secondary-header-container'>
                                <span className='secondary-header'>
                                    Entire serviced apartment hosted by Veller
                                    Homes
                                    <div className='apartment-content-container'>
                                        <span>{stay.capacity} guests</span>·
                                        <span>{stay.bedrooms} bedrooms</span>·
                                        <span>2 beds</span>·
                                        <span>{stay.bathrooms} bathrooms</span>
                                    </div>
                                </span>
                                <img
                                    className='apartment-owner-img'
                                    src='https://a0.muscache.com/im/pictures/user/5c9836a5-c81e-4b14-ba79-978811fff5ee.jpg?im_w=240'
                                />
                            </div>
                            <div className='apartment-content-container'></div>
                        </div>
                        <div className='border-bottom'></div>
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
                    <div className='border-bottom'></div>
                    <section className='air-cover'>
                        <AirCover
                            text={
                                'Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.'
                            }
                        />
                    </section>
                    <section className='amenities-container'>
                        <div className='amenities-header'>
                            What this place Offers
                        </div>
                        <div className='amenities-list-container'>
                            <div className='amenities-list'>
                                <IconText text={'Kitchen'} Icon={KitchenIcon} />
                                <IconText
                                    text={'TV with standard cable'}
                                    Icon={TvIcon}
                                />
                                <IconText text={'Dryer'} Icon={DryerIcon} />
                                <IconText
                                    text={'High chair'}
                                    Icon={HighChairIcon}
                                />
                                <IconText
                                    text={'Carbon monoxide alarm'}
                                    Icon={CarbonMonoxideAlarmIcon}
                                />
                            </div>

                            {/* <div className='amenities-list'>
                                <IconText text={'Wifi'} Icon={WifiIcon} />
                                <IconText text={'Washer'} Icon={WasherIcon} />
                                <IconText
                                    text={'Air conditioning'}
                                    Icon={AirConditioningIcon}
                                />
                                <IconText
                                    text={'Hair dryer'}
                                    Icon={HairDryerIcon}
                                />
                                <IconText
                                    text={'Smoke alarm'}
                                    Icon={SmokeAlarmIcon}
                                />
                            </div> */}
                        </div>

                        <button className='show-all-amenities'>
                            Show all amenities{' '}
                        </button>
                        <div className='border-bottom'></div>
                    </section>
                    {/* {stay.reviews.map(review=> {
                        <section className='review'>
                        <Review
                        name={review.by.fullname}
                        date={review.at}
                        review={review.txt}
                        />
                        </section>
                    })} */}
                </div>
                <ReservationCard stay={stay} />
            </div>
            <ReviewStats
                reviews={[
                    {
                        rate: {
                            accuracy: 4,
                            checkin: 3,
                            cleanliness: 4.5,
                            communication: 4.2,
                            location: 3.7,
                            value: 4.8
                        }
                    },
                    {
                        rate: {
                            accuracy: 4,
                            checkin: 3,
                            cleanliness: 4.5,
                            communication: 4.2,
                            location: 3.7,
                            value: 4.8
                        }
                    },
                    {
                        rate: {
                            accuracy: 4,
                            checkin: 3,
                            cleanliness: 4.5,
                            communication: 4.2,
                            location: 3.7,
                            value: 4.8
                        }
                    },
                    {
                        rate: {
                            accuracy: 4,
                            checkin: 3,
                            cleanliness: 4.5,
                            communication: 4.2,
                            location: 3.7,
                            value: 4.8
                        }
                    }
                ]}
            />
            <section className='review'>
                <Review
                    name={stay.reviews[0].by.fullname}
                    date={stay.reviews[0].at}
                    review={stay.reviews[0].txt}
                />
                <div className='add-review-container'>
                    <div onClick={onAddReview} className='add-review-button'>
                        Add Review
                    </div>
                    <span>Rating: </span>
                    <input
                        type='number'
                        value={review.rating}
                        onChange={(e) =>
                            setReview((review) => ({
                                ...review,
                                rating: e.target.value
                            }))
                        }
                    />

                    <span>Review: </span>
                    <textarea
                        type='text'
                        value={review.text}
                        onChange={(e) =>
                            setReview((review) => ({
                                ...review,
                                text: e.target.value
                            }))
                        }
                    />
                </div>
            </section>
            <div className='border-bottom'></div>
            <h1 className='to-know-header'>Things to know</h1>
            <section className='things-to-know-container'>
                {/* <div className='to-know-header'></div> */}
                <ThingToKnow header='House rules'>
                    <IconText
                        text={'Check-in: 3:00 PM - 12:00 AM'}
                        Icon={CheckInOutIcon}
                    />
                    <IconText
                        text={'Checkout: 10:00 AM'}
                        Icon={CheckInOutIcon}
                    />
                    <IconText text={'No smoking'} Icon={NoSmokingIcon} />
                    <IconText
                        text={'No parties or events'}
                        Icon={NoPartiesIcon}
                    />
                    <IconText
                        text={'Pets are allowed'}
                        Icon={PetsAreAllowedIcon}
                    />
                </ThingToKnow>

                <ThingToKnow header='Health & safety'>
                    <IconText
                        text={"Airbnb's COVID-19 safety practices apply"}
                        Icon={HealthCheckIcon}
                    />
                    <IconText
                        text={'Carbon monoxide alarm'}
                        Icon={HealthCheckIcon}
                    />
                    <IconText text={'Smoke alarm'} Icon={SmokingAlarmIcon} />
                </ThingToKnow>
                <ThingToKnow header='Cancellation policy'>
                    This reservation is non-refundable.Review the Host's full
                    cancellation policy which applies even if you cancel for
                    illness or disruptions caused by COVID-19.
                </ThingToKnow>
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
