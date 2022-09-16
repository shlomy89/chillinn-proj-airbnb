import '../../assets/styles/cmps/_review.scss'

export const Review = ({ name, date, review }) => {
    return (
        <div className='review-details'>
            <div className='user-details'>
                <img src={`https://robohash.org/${name}`} alt='user-img' />

                <div className='user-name-details'>
                    <span className='user-name'> {name}</span>
                    <span className='user-date'>{date}</span>
                </div>
            </div>
            {review}
        </div>
    )
}
