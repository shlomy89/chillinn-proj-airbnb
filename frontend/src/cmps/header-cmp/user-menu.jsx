import {useState, useRef, React} from 'react'
import {  useSelector, useDispatch } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import userSvg from "../../assets/img/icons/user.svg"
import hamburgerSvg from "../../assets/img/icons/hamburger.svg"
import { UserModal } from './user-modal'

export function UserMenu() {
// const [open, setOpen] = useState(false)
// const anchorRef = useRef(null)
const [isUserModalOpen, setIsUserModalOpen] = useState(false)

function handleUserModal() {
   setIsUserModalOpen(!isUserModalOpen)
}

   return (
      <div className='user-menu'>
      <button className='user-menu-btn flex justify-space-between align-center' onClick={handleUserModal}>
         <img className='hamburger-svg' src={hamburgerSvg} />
         <img className='user-svg' src={userSvg} />
      </button>
   {isUserModalOpen && <UserModal handleUserModal={handleUserModal} />}
   </div>
   )
}