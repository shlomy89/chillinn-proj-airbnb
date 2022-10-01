import '../../assets/styles/cmps/_review.scss';
import { ShowMoreButton } from './show-more-button';
import { ReactComponent as ShowMoreIcon } from '../../assets/img/icons/show-more-icon.svg';
import LinesEllipsis from 'react-lines-ellipsis';
import moment from 'moment';
import { useState } from 'react';

export const Review = ({ review }) => {
    const [showMore, setShowMore] = useState(false);
    const [isShowMoreRendered, setIsShowMoreRendered] = useState(false);
    return (
        <div className="review-details">
            <div className="user-details">
                {/* <div className="image-container"> */}
                <img src={review.user.imgUrl ?? require('../../assets/img/face1.png')} alt="user-img" />
                {/* </div> */}

                <div className="user-name-details">
                    <span className="user-name">
                        {/* {`${review.user.firstname} ${review.user.lastname === '' ? '- Review' : review.user.lastname}`} */}
                        {`${review.user.firstname} ${review.user.lastname}`}
                    </span>
                    <span className="user-date">{moment(review.date).format('MMM ,YYYY')}</span>
                </div>
            </div>
            <div className="user-review">
                <LinesEllipsis
                    text={review.text}
                    maxLine={!showMore ? 3 : 10}
                    ellipsis="..."
                    trimRight
                    basedOn="letters"
                    onReflow={({ clamped }) => {
                        // console.log(clamped)
                        if (!isShowMoreRendered) {
                            setIsShowMoreRendered(clamped);
                        }
                    }}
                />
            </div>
            {isShowMoreRendered && (
                <div className="show-more-button">
                    <ShowMoreButton
                        text={`Show ${!showMore ? 'more' : 'less'}`}
                        Icon={ShowMoreIcon}
                        onClick={() => setShowMore(prev => !prev)}
                    />
                </div>
            )}
        </div>
    );
};
