import { React, useState } from 'react'
import { Link, useNavigate , useLocation} from 'react-router-dom'
import logo from '../assets/img/logo2.png'
import { SearchBar } from './header-cmp/search-bar.jsx'
import { SearchBarDetails } from './header-cmp/search-bar-details.jsx'
import { SearchInput } from './header-cmp/search-bar-input.jsx'
import { UserMenu } from './header-cmp/user-menu.jsx'

export function AppHeader() {

    const [isSearchInputOpen, setIsSearchInputOpen] = useState(false)
    const { pathname} = useLocation()

    const handelSearchClick = (button) => {
        console.log("hello", button)
        // console.log('isSearchInputOpen:', isSearchInputOpen)
        // if (button === 'search' && isSearchInputOpen) {
        //     setIsSearchInputOpen((prevState) => !prevState)
        // }
        // setIsSearchInputOpen((prevState) => !prevState)
    }

    const navigate = useNavigate()
    const onBack = () => {
        navigate('/')
    }

    return (
        <header className='main-layout'>
            <div className='app-header'>
                <img src={logo} className='logo' onClick={onBack} />
                {pathname.includes('/stay/') ? 
                <SearchBarDetails />
                : <SearchBar handelClick={handelSearchClick} />}

                {/* {isSearchInputOpen ? (
                    <SearchInput handelClick={handelSearchClick} />
                ) : (
                    <SearchBar handelClick={handelSearchClick} />
                )} */}
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
