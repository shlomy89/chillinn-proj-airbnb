import '../../assets/styles/cmps/_apartment-info.scss'

export const ApartmentInfo = ({ text, Icon, textInfo }) => {
    return (
        <div className='apartment-info'>
            <Icon />
            {text}
            {textInfo}
        </div>
    )
}
