import '../../assets/styles/cmps/_reserve-button.scss'
import { ReserveConfirmationModal } from './reserve-confirmation'

export const ReserveButton = ({ handleClick }) => {
    return (
        <div className='reserve-button' onClick={handleClick}>
            Reserve
        </div>
    )
}
