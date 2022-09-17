import '../../assets/styles/cmps/_icon-text.scss'

export const IconText = ({ text, Icon }) => {
    return (
        <div className='icon-text-container'>
            <Icon />
            {text}
        </div>
    )
}
