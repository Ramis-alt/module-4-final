import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { deleteTask, updateTask, createTask, getTasks } from '../../ApiServices/TasksService';

//the DropdownMenu function will make HTTP requests to the backend
//and return the data to the user

function DropdownMenu({ taskId }) {
//fetches the tasks
  const handleFetchedTasks = async () => {
    try {
      await getTasks();
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
//creates new content for the task
  const handleNewContentTask = async () => {
    try {
      await createTask(taskId);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

//deletes content and title for the task
  const handleDeletedTask = async () => {
    try {
      await deleteTask(taskId);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
//updates the content for the task. Will need to be tied to the input field in the Footer.jsx
  const handleUpdatedTask = async () => {
    try {
      await updateTask(taskId);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
//renames the title for the task. Will need to be tied to the input field in the Footer.jsx
  const handleRenamedTask = async () => {
    try {
      await updateTask(taskId);
    } catch (error) {
      console.error('Error renaming task:', error);
    }
  };
  return (
    <Dropdown className='fixed--button'>
      <Dropdown.Toggle variant="Primary" id="dropdown-basic">
        Actions
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1" onClick={handleFetchedTasks}>Create New Task</Dropdown.Item>
        <Dropdown.Item href="#/action-2" onClick={handleRenamedTask}>Rename Title</Dropdown.Item>
        <Dropdown.Item href="#/action-3" onClick={handleUpdatedTask}>Update Content</Dropdown.Item>
        <Dropdown.Item href="#/action-4" onClick={handleNewContentTask}>Update Content</Dropdown.Item>
        <Dropdown.Item href="#/action-5" onClick={handleDeletedTask}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownMenu;