import '../../assets/styles/cmps/_reserve-button.scss'
import Swal from 'sweetalert2'
import moment from 'moment'
import { useEffect } from 'react'

export const ReserveButton = ({
    onClick,
    stay,
    guestsNum,
    startDate,
    endDate,
    pricePerNight,
    serviceFee,
    totalPrice
}) => {
    const openModal = () => {
        Swal.fire({
            title: 'Order Summary:',
            // icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: ' rgb(49, 132, 255) ',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I agree',

            width: 750,
            color: 'black',
            padding: '9px',
            html: `<div class='modal-container'>
            <div class='vacancy-details'>
            <div class='vacancy-place'><div class='text-details'><b>${
                stay.name
            }</b></div></div><br>
            <div class='dates'><div class='text-details'><b>from ${moment(
                startDate
            ).format('DD MMM')} until ${moment(endDate).format(
                'DD MMM'
            )}.</b></div></div></div>
            <div class='number-of-guests'>Number of guests: <div class='value'>${guestsNum}</div></div>
                <div class='price-per-night'> Price per night: <div class='value'>$${pricePerNight}</div></div>
                <div class='service-fee'> Service fee: <div class='value'>$${serviceFee}</div></div>
                <div class='total-price'> Total Price: <div class='value'><b>$${totalPrice}</b></div></div>
                </div>`,

            imageUrl: stay.imgUrls[0],
            imageWidth: 500,
            imageHeight: 250,
            imageAlt: 'Custom image'
        }).then((result) => {
            if (result.isConfirmed) {
                onClick = onClick()
                Swal.fire(
                    'Thank you!',
                    // 'Please hold while your reservation has been transferred for host approval.',
                    'your reservation request has been received and is complete for final processing, no further action is required by you.'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                Swal.fire('Cancelled', 'Your order has been canceled', 'error')
            }
        })
    }

    useEffect(() => {
        const button = document.querySelector('.reserve-button')
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

        return () => {
            button?.removeEventListener('mousemove', null)
        }
    }, [])

    return (
        <div
            className='reserve-button'
            onClick={() => {
                openModal()
            }}
        >
            Reserve
        </div>
    )
}
