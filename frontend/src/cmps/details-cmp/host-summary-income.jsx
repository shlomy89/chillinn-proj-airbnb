import { HostPieDetails } from '../host/host-pie-details'

export const HostSummaryIncome = () => {
    return (
        <div className='host-summary-income-container'>
            <div className='income-info-container'>
                <span className='income-text'>Monthly Earnings:</span>
                <span className='income-price'>$7,098</span>
            </div>
            <div className='income-info-container'>
                <span className='income-text'>Average Rating:</span>
                <span className='income-price'>4.9</span>
            </div>
            <div className='income-info-container'>
                <span className='income-text'>Amount of reviews:</span>
                <span className='income-price'>249</span>
            </div>
            <HostPieDetails />
        </div>
    )
}
