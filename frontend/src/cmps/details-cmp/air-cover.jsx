import '../../assets/styles/cmps/_air-cover.scss'
import { ShowMoreButton } from './show-more-button'
import { ReactComponent as ShowMoreIcon } from '../../assets/img/icons/show-more-icon.svg'
import Swal from 'sweetalert2'
import 'animate.css'
import { GenericModal } from './modal'
import { useState } from 'react'

export const AirCover = ({ text }) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <div className='air-cover-container'>
            <img
                className='air-cover-img'
                src={require('../../assets/img/air-cover-image.png')}
                alt={'air-cover-image'}
            />
            <span className='air-cover-text'>{text}</span>
            <div className='learn-more-button' onClick={() => handleOpen()}>
                {/* <ShowMoreButton text={'Learn more'} Icon={ShowMoreIcon} /> */}
            </div>
            <GenericModal isOpen={open} onClose={handleClose}>
                <section className='air-cover-modal-container'>
                    <img
                        className='air-cover-image'
                        src={require('../../assets/img/air-cover-image.png')}
                    />
                </section>
            </GenericModal>
            <div className='border-bottom'></div>
        </div>
    )
}
