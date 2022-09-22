import { useNavigate } from 'react-router-dom'
import logo from '../assets/img/logo2.png'
import { UserMenu } from './header-cmp/user-menu.jsx'

export function AppHeader() {
    const navigate = useNavigate()

    const onBack = () => {
        navigate('/')
    }

    return (

        <header className='main-layout'>
            <div className='app-header flex justify-space-between align-center'>
                <img src={logo} className='logo' onClick={onBack} />
                <UserMenu />
            </div>
        </header>
    )
}
