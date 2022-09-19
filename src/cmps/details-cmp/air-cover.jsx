import '../../assets/styles/cmps/_air-cover.scss'
import { BorderLine } from './border-line'
import { ShowMoreButton } from './show-more-button'
import { ReactComponent as ShowMoreIcon } from '../../assets/img/icons/show-more-icon.svg'
export const AirCover = ({ text }) => {
    return (
        <div className='air-cover-container'>
            <img
                className='air-cover-img'
                src={require('../../assets/img/air-cover-image.png')}
                alt={'air-cover-image'}
            />
            <span className='air-cover-text'>{text}</span>
            {/* <ShowMoreButton text={'learn more'} icon={ShowMoreIcon} /> */}
            <BorderLine />
        </div>
    )
}
