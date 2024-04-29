import React from 'react'
import { useState, useEffect } from 'react'
import { getTasks, createTask, deleteTask, updateTask } from '../../ApiServices/TasksService'
// import { getUser } from '../../ApiServices/UserService'

// src/main.js or any other JavaScript file
import 'popper.js';
import 'bootstrap';
import DropdownMenu from './DropdownMenu';



//each of the h3 elements will be update through useState and the backend

const Sidebar = () => {


  return (
    <aside>
      <div className='side--content'>
        <div className='sidebar--edit'>
          <h4 className='tasks--edit'>{}</h4>
        </div>
        <div className='sidebar--dropdown'>
          <DropdownMenu />
        </div>
      </div>
    </aside>
  );
}


export default Sidebar
