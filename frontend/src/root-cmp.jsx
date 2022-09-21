import { Route, Routes } from 'react-router-dom'
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


function App() {

    return (
        <div className='main-app'>
            <AppHeader />
            <main className='container'>
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
            </main>
            <AppFooter>
                <section className='container'>chill Inn 2022 &copy;</section>
            </AppFooter>
        </div>
    )
}
export default App