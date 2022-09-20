import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'


export function UserMenu() {
   //    const [open, setOpen] = React.useState(false)
   //    const anchorRef = React.useRef(null)
   return (
      <button className='user-menu-btn' onClick={handleUserModal}>
         <img className='hamburger-svg' src={hamburgerSvg} />
         <img className='user-svg' src={img} />
      </button>

   )
}