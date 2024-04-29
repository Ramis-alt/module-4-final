import React from 'react'
import { useState } from 'react'

//the footer will make HTTP requests to the backend and update the data
//it will also rename the sidebar elements

//the footer will have conditional statements based on the dropdown menu
//the footer will have a button that will submit the data to the backend

const Footer = ({ handleCreateTask, handleRenameTask, handleUpdateContent }) => {
  const [selectedAction, setSelectedAction] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (selectedAction) {
      case 'create':
        handleCreateTask(inputValue);
        break;
      case 'rename':
        handleRenameTask(inputValue);
        break;
      case 'update':
        handleUpdateContent(inputValue);
        break;
      default:
        break;
    }
    setInputValue('');
  };

  return (
    <footer className='footer--container--edit'>
      <div className='form--container'>
        <form className='form--edit' onSubmit={handleSubmit}>
          <label></label>
          <input
            className='input--footer'
            type='text'
            placeholder='Insert text'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
      </div>
      <div className="button--footer--container">
        <button type="submit" form="form--edit" className='footer--button'><img className='image--footer--edit' src='./src/images/Submitblue-button.png'/></button>
      </div>
    </footer>
  );
};


export default Footer
