import { ShowMoreButton } from './show-more-button'
import { ReactComponent as ShowMoreIcon } from '../../assets/img/icons/show-more-icon.svg'

export const ThingToKnow = ({ header, children }) => {
    return (
        <div className='thing-to-know-container'>
            <span className='thing-to-know-header'>{header}</span>
            <div className='things-to-know'>{children}</div>
            <ShowMoreButton text={'Show more'} Icon={ShowMoreIcon} />
        </div>
    )
}
