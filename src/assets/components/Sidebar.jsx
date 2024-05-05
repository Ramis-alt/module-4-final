import React from 'react'
// import { useState, useEffect } from 'react'
import { getTasks, createTask, deleteTask, updateTask } from '../../ApiServices/TasksService'
// import { getUser } from '../../ApiServices/UserService'

// src/main.js or any other JavaScript file
import 'popper.js';
import 'bootstrap';
import DropdownMenu from './DropdownMenu';



const Sidebar = ({ title, setSelectedTask, setSelectedAction }) => {

  const tasks = getTasks();

  return (
    <aside>
      <div className='side--content'>
        {tasks.map((task) => (
          <div className='sidebar--edit' key={task.id} onClick={() => setSelectedTask(task.id)}>
            {tasks.title ? <h4 className='tasks--edit'>{tasks.title}</h4> : null}
            <DropdownMenu taskId={task.id} setSelectedAction={setSelectedAction} />
          </div>
        ))}
        {/* <div className='sidebar--dropdown'>
          <DropdownMenu />
        </div> */}
      </div>
    </aside>
  );
}


export default Sidebar
