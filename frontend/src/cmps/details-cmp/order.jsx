import { BorderLine } from './border-line'
import clsx from 'clsx'
export const Order = ({
    userImg,
    name,
    reservedDate,
    vacationDate,
    guestsNum,
    apartmentLocation,
    orderStatus
}) => {
    return (
        <div className='order-wrapper'>
            <div className='order-container'>
                <div className='order-details-container'>
                    <img
                        className='user-image'
                        src={require('../../assets/img/face1.png')}
                        alt='user-img'
                    />
                    <section className='order-details'>
                        <div className='order-reserved-date'>
                            <span className='user-name'> {name}</span>
                            <span className='reserved-date'>
                                Reserved at:{reservedDate}
                            </span>
                        </div>
                        <div className='order-text-info'>
                            <span>{guestsNum} guests | </span>
                            <span>{vacationDate}</span>
                        </div>
                        <span className='order-text-info'>
                            Your apartment in
                            {apartmentLocation}
                        </span>
                    </section>
                </div>
                <span className={clsx('order-status', orderStatus)}>
                    {orderStatus}
                </span>
            </div>
            <div className='approve-order'>Approve order</div>
            <div className='reject-order'>Reject order</div>
            <BorderLine />
        </div>
    )
}
