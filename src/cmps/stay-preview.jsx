import { Link } from 'react-router-dom'
import { React, useState, useEffect } from 'react'

export function StayPreview({ stay, onRemoveStay, onAddReview }) {


    // const [image, setImage] = useState("")

    // useEffect(() => {
    //     import(`../assets/img/${stay._id}.jpg`).then((imgData) => {
    //         setImage(imgData.default)
    //     })
    // }, [])

    return (
        <div className='stay-preview'>
            <Link to={`/stay/${stay._id}`} className='info'>
                <div className="gallery-container">
                <img src={stay.imgUrls[0]}/>
                </div>
                <h2>{stay.name}</h2>
<<<<<<< HEAD
                <h2>{stay.price}&#8362;</h2>

=======
                <h3>{stay.loc.city},&nbsp;{stay.loc.country}</h3>
                <h4>{stay.capacity}&nbsp;guests</h4>
                <h3>${stay.price} night</h3>
>>>>>>> f4d351a1000345c5ac830147750e12c7b6f8ddf1
            </Link>
            {/* <button onClick={() => { onAddReview(stay._id) }}>Add review</button>
            <section className='actions'>
                <button onClick={() => onRemoveStay(stay._id)}>Delete</button>
                <Link to={`/stay/edit/${stay._id}`} >Edit</Link>
            </section> */}
        </div>
    )
}
