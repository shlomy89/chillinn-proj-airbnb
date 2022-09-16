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
                    <Route path='' element={<StayApp />} />
                </Routes>
            </main>
            <footer>
                <section className='container'>chill Inn 2022 &copy;</section>
            </footer>
        </div>
    )
}
export default App
