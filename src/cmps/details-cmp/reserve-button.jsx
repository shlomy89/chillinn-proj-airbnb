import '../../assets/styles/cmps/_reserve-button.scss'
import ReserveConfirmation from './reserve-confirmation'

export const ReserveButton = () => {
    return (
        <div className='reserve-button' onClick={() => <ReserveConfirmation />}>
            Reserve
        </div>
    )
}
