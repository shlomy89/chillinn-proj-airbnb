import { React } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Divider from '@mui/material/Divider'
import { onLogout } from '../../store/actions/user.action.js'


export function UserModal({ handleUserModal, user }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const onLogOut = async () => {
        await dispatch(onLogout())
        navigate('/')
    }

    return (
        <nav className={`user-modal-container`} onClick={handleUserModal}>
            <ul>
                {user ? (
                    user.isHost ? (
                        <li>
                            <Link
                                to={`host/${user._id}`}
                                className='user-modal-about-link'
                            >
                                <span className='user-modal-span'>
                                    <div>Hello {user.firstname} {user.lastname}</div>
                                    Manage Orders
                                </span>
                            </Link>
                            <Divider />
                        </li>
                    ) : (
                        <li>
                            <span className='user-modal-span'>
                                Hello {user.firstname} {user.lastname}
                            </span>
                            <Divider />
                        </li>
                    )
                ) : (
                    <>
                        <li>
                            <Link to={'login'}>
                                <span className='user-modal-span'>Log in</span>
                            </Link>
                        </li>

                        <li>
                            <Link to={'signup'}>
                                <span className='user-modal-span'>Sign up</span>
                            </Link>
                        </li>
                        <Divider />
                    </>
                )}
                <hr />
                <li>
                    <Link to={'stay/host'}>
                        <span className='user-modal-span'>Host your home</span>
                    </Link>
                </li>
                <li>
                    <Link to={'stay/host'}>
                        <span className='user-modal-span'>
                            Host an experience
                        </span>
                    </Link>
                </li>
                <li onClick={onLogOut}>
                    {user ? (
                        <span className='user-modal-span'>Log out</span>
                    ) : (
                        <a href='/' className='user-modal-about-link'>
                            <span className='user-modal-span'>About</span>
                        </a>
                    )}
                </li>
                <li>
                    <span className='user-modal-span'>Help</span>
                </li>
            </ul>
        </nav>
    )
}
