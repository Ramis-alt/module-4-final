import React from 'react'
import { useState, useEffect } from 'react'
import { getTasks, createTask, deleteTask, updateTask } from '../../ApiServices/TasksService'
import { getUser } from '../../ApiServices/UserService'
// import Dropdown from 'react-bootstrap/Dropdown';
// src/main.js or any other JavaScript file
import 'popper.js';
import 'bootstrap';
import DropdownMenu from './DropdownMenu';



//each of the h3 elements will be update through useState and the backend

const Sidebar = () => {
  const [newTitleValue, setNewTitleValue] = useState('');
  const [editTitleId, setEditTitleId] = useState('null');
  const [currentTitleEditing, setCurrentTitleEditing] = useState('');

  const [titulo, setTitulo] = useState('');

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const user = await getUser();
  //     console.log(user);
  //   }
  //   fetchUser();
  // }, [])

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     const tasks = await getTasks();
//     setTitulo(tasks.title);
//   }

//  const handleCreatedTitle = async () => {
//     await createTask({ newTitleValue });
//     fetchTasks();
//  }

//  const handleDeletedTitle = async (id) => {
//     await deleteTask(id);
//     fetchTasks();
//   }

  const handleUpdateTitle = async (id) => {
    await updateTask({ id, title: currentTitleEditing });
    setEditTitleId(null);
    fetchTasks();
  }
  // create a state for the sidebar
  // const {open, setOpen} = React.useState(false)
  // console.log(open)
  return (
    
    <aside>
        <div className='sidebar--edit'>
          <h3 className='tasks--edit'>Sidebar</h3>
        </div>
        <div className='sidebar--dropdown'>
          <DropdownMenu/>
        </div>

    </aside>
    
  )
}

export default Sidebar
