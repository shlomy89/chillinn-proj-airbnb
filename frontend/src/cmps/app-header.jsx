import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/img/logo2.png'
import { SearchBar } from './header-cmp/search-bar.jsx'
import { UserMenu } from './header-cmp/user-menu.jsx'

export function AppHeader() {
    const navigate = useNavigate()

    const onBack = () => {
        navigate('/')
    }

    return (
        <header className='main-layout'>
            <div className='app-header'>
                <img src={logo} className='logo' onClick={onBack} />
                <SearchBar />
                <div className='user-options flex row justify-space-between align-center'>
                    <Link to={'stay/host'}>
                        <button className='btn-host'>Become a Host</button>
                    </Link>
                    <UserMenu />
                </div>
            </div>
        </header>
    )
}
