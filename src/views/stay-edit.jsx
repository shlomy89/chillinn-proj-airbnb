import { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from '../hooks/useForm'
import { stayService } from '../services/stay.service'
import { addStay, updateStay } from '../store/actions/stay.action'

export const StayEdit = () => {

    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]

    const [stay, handleChange, setStay] = useForm({
        name: '',
        price: 0,
        labels: [],
        imgUrl: 'https://res.cloudinary.com/cajul22/image/upload/v1663142872/stay_img/2937_MrPotatoHead_TS4_40__87921_xjbdew.jpg'
    })

    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
        const stayId = params.id
        if (!stayId) return
        stayService.getById(stayId)
            .then(stay => {
                setStay(stay)
            })
            .catch(err => {
                console.log('err:', err);
            })
    }, [])

    const onSaveStay = (ev) => {
        ev.preventDefault()
        if (stay._id) {
            dispatch(updateStay(stay))
                .then(() => {
                    navigate('/')
                })
        } else {
            dispatch(addStay(stay))
                .then(() => {
                    navigate('/')
                })
        }
    }

    return (
        <section className='stay-edit'>
            <h1>{stay._id ? 'Edit' : 'Add'} Stay</h1>
            <form onSubmit={onSaveStay}>
                <label htmlFor="name">Name</label>

                <input
                    ref={inputRef}
                    value={stay.name}
                    onChange={handleChange}
                    type="text"
                    name="name"
                    id="name" />

                <label htmlFor="price">Price</label>
                <input
                    ref={inputRef}
                    value={stay.price}
                    onChange={handleChange}
                    type="number"
                    name="price"
                    id="price" />

                <label htmlFor="labels">Labels</label>
                <select
                    name="labels"
                    id="labels"
                    onChange={handleChange}>
                    <option
                        ref={inputRef}
                        key={labels}
                        value="">
                        All</option>
                    {labels.map(label => <option
                        key={label}
                        value={label}>
                        {label}</option>)}
                </select>

                <button>Save</button>
            </form>
        </section>
    )
}
