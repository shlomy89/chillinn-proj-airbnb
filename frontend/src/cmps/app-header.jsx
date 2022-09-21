import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { onLogout } from '../store/actions/user.action.js'
import logo from '../assets/img/logo2.png'
// import { StayFilter } from './stay-filter.jsx'
import { Button } from '@mui/material'
import {UserMenu} from './header-cmp/user-menu.jsx'

export function AppHeader() {
    const loggedInUser = useSelector((state) => state.userModule.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onBack = () => {
        navigate('/')
    }

    const logout = async () => {
        await dispatch(onLogout())
    }

    return (
        <header className='app-header flex justify-space-between align-center'>
            <img src={logo} className='logo' onClick={onBack} />

                <section>
                <Link to='/stay/edit'><Button>Host your home</Button></Link>&nbsp;
                <NavLink to='/login'><Button>Login/Sign Up</Button></NavLink>
                </section>
                <UserMenu/>

            {/* {loggedInUser && (
                    <section className='user'>
                        <p>
                            Name: {loggedInUser.firstname}{' '}
                            {loggedInUser.lastname}
                        </p>
                    </section>
                )} */}
            {/* <nav>
                    <NavLink to=''>Home</NavLink>
                    <NavLink to='dashboard'>Dashboard</NavLink>
                    <NavLink to='about'>About</NavLink>
                    {!loggedInUser ? (
                        <NavLink to='login'>Login</NavLink>
                    ) : (
                        <Button
                            className='btn-back'
                            variant='outlined'
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    )}
                </nav> */}
        </header>
    )
}
