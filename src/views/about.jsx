import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { GoogleMaps } from '../cmps/google-map.jsx'

export function About() {
    const navigate = useNavigate()

    const onBack = () => {
        navigate('/')
    }

    return (
        <section className='about'>
            <Button className='btn-back' variant='outlined' onClick={onBack}>
                Back
            </Button>
            <h2>About Mister Stay</h2>
            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla
                minus explicabo ipsum necessitatibus cupiditate facere corrupti,
                praesentium tempora molestias, accusantium repellendus, in
                quasi. Iste labore maxime, vitae nulla odit sints.
            </p>
            <GoogleMaps />
        </section>
    )
}
