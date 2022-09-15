import { useSelector, useDispatch } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { onLogout } from '../store/actions/user.action.js'
import logo from "../assets/img/logo.png"
import { Button } from '@mui/material'

export function AppHeader() {

    const loggedInUser = useSelector(state => state.userModule.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const onBack = () => {
        navigate('/')
    }

    const logout = async () => {
        await dispatch(onLogout())
    }

    return (
        <header className='app-header'>
            <section className='container'>
                <img src={logo} className="logo" onClick={onBack} />
                {loggedInUser && <section className="user">
                    <p>Name: {loggedInUser.firstname} {loggedInUser.lastname}</p>
                    <p>Balance: {loggedInUser.score}</p>
                </section>}
                <nav>
                    <NavLink to='' >Home</NavLink>
                    <NavLink to='dashboard' >Dashboard</NavLink>
                    <NavLink to='about'>About</NavLink>
                    {!loggedInUser ? <NavLink to='login'>Login</NavLink>
                        : <Button className='btn-back' variant="outlined" onClick={logout}>Logout</Button>}

                </nav>
            </section>
        </header>
    )
}