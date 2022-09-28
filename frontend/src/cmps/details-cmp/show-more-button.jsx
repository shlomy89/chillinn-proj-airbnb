import '../../assets/styles/cmps/_show-more-button.scss'

export const ShowMoreButton = ({ text, Icon, onClick }) => {
    return (
        <div className='show-more-button' onClick={onClick}>
            {text}
            <div className='icon-weight'>
                <Icon />
            </div>
        </div>
    )
}
