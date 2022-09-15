import '../../assets/styles/cmps/_action-button.scss'

export const ActionButton = ({ text, Icon }) => {
    return (
        <div className='action-rating'>
            <Icon />
            {text}
        </div>
    )
}
