import '../../assets/styles/cmps/_apartment-info.scss'

export const ApartmentInfo = ({ text, Icon, textInfo }) => {
    return (
        <div className='apartment-info'>
            <Icon />
            <div className='apartment-text-info-container'>
                <span className='apartment-text-header'> {text}</span>
                <span className='apartment-text-info'>{textInfo}</span>
            </div>
        </div>
    )
}
