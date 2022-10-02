import { useState, React } from 'react'
import { useSelector } from 'react-redux'
import userSvg from "../../assets/img/icons/user.svg"
import hamburgerSvg from "../../assets/img/icons/hamburger.svg"
import { UserModal } from './user-modal'

export function UserMenu() {

   const [isUserModalOpen, setIsUserModalOpen] = useState(false)
   const user = useSelector((state) => state.userModule.user)

   function handleUserModal() {
      setIsUserModalOpen(!isUserModalOpen)
   }

   return (
      <div className='user-menu'>
         <button className='user-menu-btn flex justify-space-between align-center' onClick={handleUserModal}>
            <img className='hamburger-svg' src={hamburgerSvg} />
            <img className={user ? 'loggedInUser' : 'user-svg'} src={user ? user.imgUrl : userSvg} />
         </button>
         {isUserModalOpen &&
            <UserModal
               user={user}
               handleUserModal={handleUserModal} />}
      </div>
   )
}