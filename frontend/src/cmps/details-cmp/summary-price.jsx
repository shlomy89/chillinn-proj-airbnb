import '../../assets/styles/cmps/_summary-price.scss'
import { utilService } from '../../services/util.service'
export const SummaryPrice = ({ text, total }) => {
    const { numberWithCommas } = utilService
    return (
        <div className='summary-price'>
            <span className='text-summary-price'>{text}</span>
            <span> ${numberWithCommas(total)}</span>
        </div>
    )
}
