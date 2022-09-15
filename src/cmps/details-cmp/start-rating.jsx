import { ReactComponent as StarIcon } from '../../assets/img/icons/star.svg'
import '../../assets/styles/cmps/_star-rating.scss'
export const StarRating = ({ rating, reviews }) => {
    return (
        <div className='star-rating'>
            <div className='rating-container'>
                <StarIcon fill='black' />
                {rating}
            </div>
            <div className='reviews-container'>{reviews} reviews</div>
        </div>
    )
}
