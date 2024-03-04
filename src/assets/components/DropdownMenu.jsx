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
        <Dropdown.Item href="#/action-1">Rename</Dropdown.Item>
        <Dropdown.Item href="#/action-1">Create</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Update</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Get</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownMenu;