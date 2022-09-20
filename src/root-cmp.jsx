import { Navigate, Route, Routes } from 'react-router-dom'
// import './assets/styles/'
import { StayApp } from './views/stay-app.jsx'
import { AppHeader } from './cmps/app-header'
import { About } from './views/about.jsx'
import { StayDetails } from './views/stay-details.jsx'
import { StayEdit } from './views/stay-edit.jsx'
import { StayDashboard } from './views/backoffice.jsx'
import { Login } from './views/user-login.jsx'
import { Signup } from './views/sign-up.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { loadStays } from './store/actions/stay.action.js'
import { useEffect } from 'react'
import { Host } from './views/host.jsx'
import { AppFooter } from './cmps/details-cmp/app-footer.jsx'

function App() {
    const dispatch = useDispatch()
    const { stays } = useSelector((state) => state.stayModule)

    useEffect(() => {
        dispatch(loadStays())
    }, [])

    return (
        <div className='main-app'>
            <AppHeader />
            <main className='container'>
                {!stays ? (
                    <div>Loading...</div>
                ) : (
                    <Routes>
                        <Route path='stay/edit/:id' element={<StayEdit />} />
                        <Route path='stay/edit' element={<StayEdit />} />
                        <Route path='stay/:id' element={<StayDetails />} />
                        <Route path='dashboard' element={<StayDashboard />} />
                        <Route path='login' element={<Login />} />
                        <Route path='signup' element={<Signup />} />
                        <Route path='about' element={<About />} />
                        <Route path='host' element={<Host />} />
                        <Route path='' element={<StayApp />} />
                    </Routes>
                )}
            </main>
            <AppFooter>
                <section className='container'>chill Inn 2022 &copy;</section>
            </AppFooter>
        </div>
    )
}
export default App
