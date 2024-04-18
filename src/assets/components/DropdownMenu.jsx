import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

//the DropdownMenu function will make HTTP requests to the backend
//and return the data to the user

function DropdownMenu() {
  return (
    <Dropdown className='fixed--button'>
      <Dropdown.Toggle variant="Primary" id="dropdown-basic">
        Actions
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Rename Title</Dropdown.Item>
        <Dropdown.Item href="#/action-1">Create Title</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownMenu;