import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';


function DropdownMenu({ taskId, setSelectedAction }) {
  const handleDropdown = (action) => {
    setSelectedAction(action);
  }

  // Function to delete the task
  const handleDeleteTask = async () => {
    try {
      // Make a DELETE request to delete the task
      await fetch(`/delete_content/${taskId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <Dropdown className='fixed--button'>
      <Dropdown.Toggle variant="Primary" id="dropdown-basic">
        Actions
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-2" onClick={() => handleDropdown('rename')}>Rename Title</Dropdown.Item>
        <Dropdown.Item href="#/action-3" onClick={() => handleDropdown('update')}>Update Content</Dropdown.Item>
        <Dropdown.Item href="#/action-4" onClick={handleDeleteTask}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownMenu;
