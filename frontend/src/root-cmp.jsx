import { Route, Routes, useLocation } from 'react-router-dom'
import { StayApp } from './views/stay-app.jsx'
import { AppHeader } from './cmps/app-header'
import { About } from './views/about.jsx'
import { StayDetails } from './views/stay-details.jsx'
import { StayEdit } from './views/stay-edit.jsx'
import { StayDashboard } from './views/backoffice.jsx'
import { Login } from './views/user-login.jsx'
import { Signup } from './views/sign-up.jsx'
import { Host } from './views/host.jsx'
import { AppFooter } from './cmps/details-cmp/app-footer.jsx'
import './assets/styles/views/_root-cmp.scss'

function App() {
    const { pathname } = useLocation()
    return (
        <div className='main-app'>
            <header
                // className='header-container main-layout'
                className={
                    pathname.includes('/stay/') || pathname.includes('/host/')
                        ? 'header-container narrow main-layout'
                        : 'header-container main-layout'
                }
            >
                <AppHeader />
            </header>
            <main className='main-container'>
                <Routes>
                    <Route path='stay/edit/:id' element={<StayEdit />} />
                    <Route path='stay/edit' element={<StayEdit />} />
                    <Route path='stay/:id' element={<StayDetails />} />
                    <Route path='dashboard' element={<StayDashboard />} />
                    <Route path='login' element={<Login />} />
                    <Route path='signup' element={<Signup />} />
                    <Route path='about' element={<About />} />
                    <Route path='host/:id' element={<Host />} />
                    <Route path='' element={<StayApp />} />
                </Routes>
            </main>
            <AppFooter>
                <section className='container'>chill Inn 2022 &copy;</section>
            </AppFooter>
        </div>
    )
}
export default App
