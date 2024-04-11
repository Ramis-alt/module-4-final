import React from 'react'
// import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getTasks, createTask, deleteTask, updateTask } from '../../ApiServices/TasksService'
import { removeJwt } from '../../ApiServices/JwtService'
import { getUser } from '../../ApiServices/UserService'

const Navbar = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    removeJwt()
    navigate('/')
  }

const [currentUser, setCurrentUser] = useState(null)

useEffect(() => {
  fetchUser()
}, [])

const fetchUser = async () => {
  const user = await getUser()
  setCurrentUser(user)
}
// console.log(fetchUser)
  return (
    <div className='nav--content'>
      <img className='img--nav--edit' src='./src/images/Tusker-Remake-100-cutout 1.png'/>
      {currentUser && <h2 className='text--nav--edit'>Welcome, {currentUser.user_name}</h2>}
      <div className='button--nav--container'>
        {/* use ApiServices to make this functional, also add a function above to deal with this event */}
        <button className='button--nav--edit' onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  )
}

export default Navbar
