import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { stayService } from '../services/stay.service'
import { reviewService } from "../services/review.service"
import { Button } from '@mui/material'
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
        stayService.getById(stayId)
            .then(stay => {
                // import(`../assets/img/${stay._id}.jpg`).then((imgData) => {
                //     setImage(imgData.default)
                // })
                // getNextStay(stay._id)
                setStay(stay)
            })
        reviewService.query({ stayId })
            .then(reviews => setReviews(reviews))
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
            const newReviews = reviews.filter(review => review._id !== reviewId)
            setReviews(newReviews)
        } catch (err) {
            console.log(err)
        }
    }
    if (!stay) return <div>Loading...</div>
    return (
        <div className='stay-details'>
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
            </section> */}
            <section>
                <h3>{stay.inStock ? '' : '(out of stock)'}</h3>
            </section>
            {/* <Link to={`/stay/${nextStayId}`}>
                <Button variant="outlined">Next Stay</Button>
            </Link> */}
            {/* <img src={image} alt="" /> */}
            {reviews && <section className="stays-reviews">
                {reviews.map(review => (
                    <article key={review._id}>
                        <h3>{review.txt}</h3>
                        <h3>Written by {review.user.firstname}</h3>
                        {/* <h5>{utilService.getCreatedTime(review.createdAt)}</h5> */}
                        <button onClick={() => onRemoveReview(review._id)}>Remove</button>
                        <hr />
                    </article>
                ))}
            </section>}
        </div>
    )
}