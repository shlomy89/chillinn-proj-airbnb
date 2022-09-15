import '../../assets/styles/cmps/_main-features.scss'

export const MainFeatures = ({ text, Icon }) => {
    return (
        <div className='main-features'>
            <Icon />
            {text}
        </div>
    )
}
