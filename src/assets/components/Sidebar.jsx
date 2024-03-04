import React from 'react'
// import { useState } from 'react'
// import Dropdown from 'react-bootstrap/Dropdown';
// src/main.js or any other JavaScript file
import 'popper.js';
import 'bootstrap';
import DropdownMenu from './DropdownMenu';

// import { Link } from 'react-router-dom'
// import { useAuth } from '../contexts/AuthContext'
// import { useHistory } from 'react-router-dom'

//each of the h3 elements will be update through useState and the backend

const Sidebar = () => {
  // const {open, setOpen} = React.useState(false)
  // console.log(open)
  return (
    
    <aside>
        <div className='sidebar--edit'>
          <h3 className='tasks--edit'>Sidebar</h3>
          <h3 className='tasks--edit'>Sidebar</h3>
          <h3 className='tasks--edit'>Sidebar</h3>
          <h3 className='tasks--edit'>Sidebar</h3>
          <h3 className='tasks--edit'>Sidebar</h3>
        </div>
        <div className='sidebar--dropdown'>
          <DropdownMenu/>
        </div>

    </aside>
    
  )
}

export default Sidebar
