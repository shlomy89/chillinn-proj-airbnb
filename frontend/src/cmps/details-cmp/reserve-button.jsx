import '../../assets/styles/cmps/_reserve-button.scss'
import Swal from 'sweetalert2'
import moment from 'moment'
import { useEffect } from 'react'

export const ReserveButton = ({
    onClick,
    stay,
    guestsNum,
    startDate,
    endDate
}) => {
    const openModal = () => {
        Swal.fire({
            title: 'Pending Reserved!',
            text: `Vacancy name: "${stay.name}".
            
            Dates: from ${moment(startDate).format('DD MMM')} until ${moment(
                endDate
            ).format('DD MMM')}.
            Please hold while your reservation has been transferred for host approval.`,
            imageUrl: stay.imgUrls[0],
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image'
        })
    }

    useEffect(() => {
        const button = document.querySelector('.reserve-button')
        console.log({ button })
        if (!button) {
            return
        }
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect()
            const x = ((e.clientX - rect.left) * 100) / button.clientWidth
            const y = ((e.clientY - rect.top) * 100) / button.clientHeight
            button.style.setProperty('--mouse-x', x)
            button.style.setProperty('--mouse-y', y)
        })

        // return () => {
        //     button.removeEventListener('mousemove')
        // }
    }, [])

    return (
        <div
            className='reserve-button'
            onClick={() => {
                onClick()
                openModal()
            }}
        >
            Reserve
        </div>
    )
}
