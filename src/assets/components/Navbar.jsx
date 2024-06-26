import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { removeJwt } from '../../ApiServices/JwtService'
import { getUser } from '../../ApiServices/UserService'

const Navbar = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    removeJwt()
    navigate('/')
  }

const [currentUser, setCurrentUser] = useState('');

useEffect(() => {
  const fetchUserData = async () => {
    try {
      const userData = await getUser();
      setCurrentUser(userData.username);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  fetchUserData();
}, []); // Empty dependency array ensures useEffect runs only once, do not change this

  return (
    <div className='nav--content'>
      <img className='img--nav--edit' src='./src/images/Tusker-Remake-100-cutout 1.png'/>
      <h2 className='text--nav--edit'>Welcome, {currentUser}</h2>
      <div className='button--nav--container'>
        <button className='button--nav--edit' onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  )
}

export default Navbar
