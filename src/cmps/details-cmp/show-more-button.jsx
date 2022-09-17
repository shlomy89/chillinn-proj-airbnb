import '../../assets/styles/cmps/_show-more-button.scss'

export const ShowMoreButton = ({ text, Icon }) => {
    return (
        <div className='show-more-button'>
            {text}
            <div className='icon-weight'>
                {' '}
                <Icon />{' '}
            </div>
        </div>
    )
}
