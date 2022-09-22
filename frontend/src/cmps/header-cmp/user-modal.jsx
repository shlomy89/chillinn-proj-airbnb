import {React, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
// import { updateUserNotifications, updateUser } from "../../../store/user.action"
import Divider from '@mui/material/Divider'
import { userService } from "../../services/user.service"
import { useDispatch } from "react-redux"

export function UserModal({ handleUserModal }) {
	const [loggedInUser, setLoggedInUser] = useState(userService.getLoggedinUser())
	// const isActive = useSelector((state) => state.headerModule.headerMode.isActive)
	const user = useSelector((state) => state.userModule.user)
	const navigate = useNavigate()
	// const notificationsAmount = user.notifications?.length
	// const dispatch = useDispatch()
	// const navigate = useNavigate()

	// const resetUserNotifications = async () => {
	// 	const currUser = await userService.getById(loggUser?._id)
	// 	const updatedUser = { ...currUser, notifications: [] }
	// 	const newUser = await userService.update(updatedUser)
	// 	userService.setLoggedInUser(newUser)
	// 	dispatch(updateUserNotifications([]))
	// }

	function onLogOut() {
		userService.logout()
		setLoggedInUser(null)
		// dispatch(updateUser({}))
		navigate("/")
	}

	return (
		<nav className={`user-modal-container `} onClick={handleUserModal}>
			<ul>
				{/* <li onClick={resetUserNotifications}>
					{loggUser ? (
						<Link to={"/host"}>
							<span className='user-modal-span'>{loggUser.isHost ? "Statistics & Dashboard" : "My trips & Wishlist"}</span>
							{notificationsAmount ? <div className='user-notifications-dot'>{notificationsAmount}</div> : <></>}
						</Link>
					) : (
						<Link to={"/user/signup"}>
							<span className='user-modal-span'>Sign up</span>
						</Link>
					)}
				</li> */}
				{/* <li> */}
				{loggedInUser ? (
					<li>
						<Link to={"stay/order"} className='user-modal-about-link'>
							<span className='user-modal-span'>{loggedInUser.firstname} {loggedInUser.lastname}</span>
						</Link>
						<Divider />
					</li>
				) : (
					<>
						<li>
							<Link to={"login"}>
								<span className='user-modal-span'>Log in</span>
							</Link>
						</li>

						<li>
							<Link to={"signup"}>
								<span className='user-modal-span'>Sign up</span>
							</Link>
						</li>
						<Divider />
					</>
				)}
				<hr />
				<li>
					<Link to={"stay/host"}>
						<span className='user-modal-span'>Host your home</span>
					</Link>
				</li>
				<li>
					<Link to={"stay/host"}>
						<span className='user-modal-span'>Host an experience</span>
					</Link>
				</li>
				<li onClick={onLogOut}>
					{loggedInUser ? (
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
