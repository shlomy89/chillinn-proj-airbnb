import { useDispatch } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { onLogout } from '../store/actions/user.action.js'
import logo from '../assets/img/logo2.png'
import { Button } from '@mui/material'
import { UserMenu } from './header-cmp/user-menu.jsx'

export function AppHeader() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

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
