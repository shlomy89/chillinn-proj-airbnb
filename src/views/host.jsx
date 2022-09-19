import { HostPieDetails } from '../cmps/host/pie'
import '../assets/styles/cmps/_host-summary.scss'
export const Host = () => {
    return (
        <div className='hosting-summary-container'>
            <span className='hosting-header'>Hosting Summary</span>
            <span className='secondary-header'>Fantastic Job!</span>
            <HostPieDetails />
        </div>
    )
}
