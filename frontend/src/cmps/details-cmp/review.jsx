import '../../assets/styles/cmps/_review.scss'
import { ShowMoreButton } from './show-more-button'
import { ReactComponent as ShowMoreIcon } from '../../assets/img/icons/show-more-icon.svg'
import { BorderLine } from './border-line'
import LinesEllipsis from 'react-lines-ellipsis'

export const Review = ({ name, date, review }) => {
    return (
        <div className='review-details'>
            <div className='user-details'>
                <div className='image-container'>
                    <img
                        src={require('../../assets/img/face1.png')}
                        alt='user-img'
                    />
                </div>

                <div className='user-name-details'>
                    <span className='user-name'> {name}</span>
                    <span className='user-date'>{date}</span>
                </div>
            </div>
            <div className='user-review'>
                <LinesEllipsis
                    text={review}
                    maxLine='3'
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                />
            </div>
            <div className='show-more-button'>
                <ShowMoreButton text={'Show more'} Icon={ShowMoreIcon} />
            </div>
            <BorderLine />
        </div>
    )
}
