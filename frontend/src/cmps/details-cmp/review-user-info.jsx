export function Review({ review }) {
    console.log(review)
    return (
        <div className='review'>
            <div className='review-user-info flex'>
                <img
                    src={require('../../assets/img/face1.png')}
                    alt='user-img'
                />
                <h2>{review.by.fullName}</h2>
            </div>
            <p>{review.txt}</p>
        </div>
    )
}
