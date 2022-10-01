import '../../assets/styles/cmps/_review-stats.scss';
import { compact, map, mean, meanBy, values } from 'lodash';
import { StarRating } from './star-rating';

export function ReviewStats({ reviews, rating }) {
    const rating2 = meanBy(reviews, ({ rating }) => mean(values(rating))).toFixed(2);
    const stats = {
        Accuracy: 0,
        Checkin: 0,
        Cleanliness: 0,
        Communication: 0,
        Location: 0,
        Value: 0,
    };
    reviews.forEach(review => {
        stats.Accuracy += review.rating.accuracy;
        stats.Checkin += review.rating.checkin;
        stats.Cleanliness += review.rating.cleanliness;
        stats.Communication += review.rating.communication;
        stats.Location += review.rating.location;
        stats.Value += review.rating.value;
    });
    for (const key in stats) {
        stats[key] = (stats[key] / reviews.length).toFixed(1);
    }
    const avgStats = Object.keys(stats);

    return (
        <div className="review-stats-container">
            <div className="stats-rating">
                <StarRating rating={rating2} reviews={reviews?.length} className={'stats-rating'} />
            </div>
            <div className="review-stats">
                {avgStats.map((stat, index) => {
                    const currAvg = `${(stats[stat] / 5) * 100}%`;
                    return (
                        <div className="rating-container" key={index}>
                            {stat}
                            <div className="stat-container">
                                <div className="stat-bar-container">
                                    <div style={{ width: currAvg }} className="stat-value"></div>
                                </div>
                                <span>{stats[stat]}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
