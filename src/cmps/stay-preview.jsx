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
                {/* <img src={image} alt="" /> */}
                <h2>{stay.name}</h2>
                <h2>{stay.price}&#8362;</h2>

            </Link>
            <button onClick={() => { onAddReview(stay._id) }}>Add review</button>
            <section className='actions'>
                <button onClick={() => onRemoveStay(stay._id)}>Delete</button>
                <Link to={`/stay/edit/${stay._id}`} >Edit</Link>
            </section>
        </div>
    )
}
