import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';


function DropdownMenu({ taskId, setSelectedAction, handleDeleteTask }) {
  const handleDropdown = (action) => {
    setSelectedAction(action);
  }

  return (
    <Dropdown className='fixed--button'>
      <Dropdown.Toggle variant="Primary" id="dropdown-basic">
        Actions
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1" onClick={() => handleDropdown('rename')}>Rename Title</Dropdown.Item>
        <Dropdown.Item href="#/action-2" onClick={() => handleDropdown('update')}>Update Content</Dropdown.Item>
        <Dropdown.Item href="#/action-3" onClick={() => handleDeleteTask(taskId)}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownMenu;
