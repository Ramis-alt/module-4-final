import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='nav--content'>
      <img className='img--nav--edit' src='./src/images/Tusker-Remake-100-cutout 1.png'/>
      <h2 className='text--nav--edit'>Welcome, Ramiro</h2>
      <div className='button--nav--container'>
        {/* use ApiServices to make this functional, also add a function above to deal with this event */}
        <button className='button--nav--edit'>Log Out</button>
      </div>
    </div>
  )
}

export default Navbar
