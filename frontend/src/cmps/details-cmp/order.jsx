import clsx from 'clsx'
import moment from 'moment/moment'
export const Order = ({ userImg, name, order, apartmentLocation, onClick }) => {
    const { createdAt, startDate, endDate, guestsNum, orderStatus } = order

    return (
        <div className='order-wrapper'>
            <div className='order-container'>
                <div className='order-details-container'>
                    <img className='user-image' src={userImg} alt='user-img' />
                    <section className='order-details'>
                        <div className='order-reserved-date'>
                            <span className='user-name'> {name}</span>
                            <span className='reserved-date'>
                                Reserved at:{' '}
                                {`${moment(+createdAt).format('dddd')} ${moment(
                                    +createdAt
                                ).format('MMM DD, YYYY')}`}
                            </span>
                        </div>
                        <div className='order-text-info'>
                            <span>{guestsNum} guests | </span>
                            <span>
                                {/* {moment(+vacationDate).weekday()} */}
                                {`${moment(startDate).format('MMM')} ${moment(
                                    startDate
                                ).format('DD')} - ${moment(endDate).format(
                                    'DD'
                                )}`}
                            </span>
                        </div>
                        <span className='order-text-info'>
                            Your apartment in
                            {apartmentLocation}
                        </span>
                    </section>
                </div>
                {orderStatus !== 'pending' ? (
                    <span className={clsx('order-status', orderStatus)}>
                        {orderStatus}
                    </span>
                ) : (
                    <div className='order-actions-button'>
                        {' '}
                        <div onClick={() => onClick(order, 'approved')}>
                            approve
                        </div>
                        <div onClick={() => onClick(order, 'rejected')}>
                            Reject
                        </div>
                    </div>
                )}
            </div>
            {/* <div className='approve-order'>Approve order</div>
            <div className='reject-order'>Reject order</div> */}
        </div>
    )
}
