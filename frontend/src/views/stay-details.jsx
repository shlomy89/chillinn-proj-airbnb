import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { stayService } from '../services/stay.service'
import { StarRating } from '../cmps/details-cmp/star-rating'
import { ActionButton } from '../cmps/details-cmp/action-button'
import { ReactComponent as HeartIcon } from '../../src/assets/img/icons/heart-icon.svg'
import { ReactComponent as ShareIcon } from '../../src/assets/img/icons/share-icon.svg'
import { IconText } from '../cmps/details-cmp/icon-text'
import { Review } from '../cmps/details-cmp/review'
import { ReactComponent as NoSmokingIcon } from '../../src/assets/img/icons/no-smoking-icon.svg'
import { ReactComponent as NoPartiesIcon } from '../../src/assets/img/icons/no-parties-icon.svg'
import { ReactComponent as PetsAllowedIcon } from '../../src/assets/img/icons/pets-allowed-icon.svg'
import { ReactComponent as HealthCheckIcon } from '../../src/assets/img/icons/health-check-icon.svg'
import { ReactComponent as SmokingAlarmIcon } from '../../src/assets/img/icons/smoking-alarm-icon.svg'
import { ThingToKnow } from '../cmps/details-cmp/thing-to-know'
import { ReservationCard } from '../cmps/details-cmp/reservation-card'
import { AirCover } from '../cmps/details-cmp/air-cover'
import { ReviewStats } from '../cmps/details-cmp/Review-stats'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { loadReviews } from '../store/actions/review.actions'
import { useDispatch, useSelector } from 'react-redux'
import { compact, map, mean, meanBy, values } from 'lodash'
import { AddReview } from '../cmps/details-cmp/add-review'
import { Collapse } from 'react-collapse'
import { Amenity } from '../cmps/details-cmp/amenity'
import { AppHeader } from '../cmps/app-header'
import clsx from 'clsx'

export const StayDetails = () => {
    const dispatch = useDispatch()
    const [stay, setStay] = useState(null)
    const [isOpen, setIsOpen] = useState(null)
    const reviews = useSelector((state) =>
        state.reviewModule.reviews.sort((revA, revB) =>
            new Date(revA.date).getTime() > new Date(revB.date).getTime()
                ? -1
                : 1
        )
    )

    const params = useParams()
    const navigate = useNavigate()

    const rating = meanBy(reviews, ({ rating }) =>
        mean(values(rating))
    ).toFixed(2)

    useEffect(() => {
        const stayId = params.id
        const getReviews = async () => {
            const stay = await stayService.getById(stayId)
            setStay(stay)
            dispatch(loadReviews({ stayId }))
        }
        getReviews()
    }, [params.id])

    const amenities = compact(
        map(stay?.amenities, (amenity) => (
            <Amenity amenity={amenity} key={amenity} />
        ))
    )

    if (!stay) {
        return (
            <div className='stay-app main-layout'>
                <Box sx={{ display: 'flex', margin: '100px auto' }}>
                    <CircularProgress />
                </Box>
            </div>
        )
    }
    return (
        <div className='stay-details narrow main-layout'>
            {/* <AppHeader className={'xyz main-layout full'} /> */}
            <div className='title'>
                <h3>{stay.name}</h3>
            </div>
            <div className='stay-apartment-location-header-container'>
                <div className='apartment-location-rating'>
                    <StarRating rating={rating} reviews={reviews?.length} />
                    <span>??</span>{' '}
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
                    <img
                        className='apartment-border-top'
                        src={stay.imgUrls[3]}
                    />
                    <img
                        className='apartment-border-bottom'
                        src={stay.imgUrls[4]}
                    />
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
                                        <span>{stay.capacity} guests</span>??
                                        <span>{stay.bedrooms} bedrooms</span>??
                                        <span>2 beds</span>??
                                        <span>{stay.bathrooms} bathrooms</span>
                                    </div>
                                </span>
                                <img
                                    className='apartment-owner-img'
                                    src={stay.host.thumbnailUrl}
                                />
                            </div>
                            <div className='apartment-content-container'></div>
                        </div>
                        <div className='border-bottom'></div>
                        <div className='apartment-info'>
                            {amenities.slice(0, 3)}
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
                                {amenities.slice(0, 10)}
                            </div>
                        </div>
                        <Collapse className='amenities-list' isOpened={isOpen}>
                            <div className='amenities-list-container'>
                                <div className='amenities-list'>
                                    {amenities.slice(10)}
                                </div>
                            </div>
                        </Collapse>
                        {amenities.length > 10 && (
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className='show-all-amenities'
                            >
                                Show {isOpen ? 'less' : 'more'} amenities
                            </button>
                        )}
                        <div className='border-bottom'></div>
                    </section>
                </div>
                <ReservationCard
                    stay={stay}
                    reviews={reviews}
                    rating={rating}
                />
            </div>
            <ReviewStats reviews={reviews} />
            <section className='review'>
                <div className='reviews-container'>
                    {reviews?.slice(0, 6).map((review) => (
                        <Review key={review._id} review={review} />
                    ))}
                </div>
                <h3 className='add-review-header'>Add Review</h3>
                <AddReview stay={stay} />
            </section>
            <div className='border-bottom'></div>
            <h1 className='to-know-header'>Things to know</h1>
            <section className='things-to-know-container'>
                <ThingToKnow header='House rules'>
                    <IconText text={'No smoking'} Icon={NoSmokingIcon} />
                    <IconText
                        text={'No parties or events'}
                        Icon={NoPartiesIcon}
                    />
                    <IconText
                        text={'Pets are allowed'}
                        Icon={PetsAllowedIcon}
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
