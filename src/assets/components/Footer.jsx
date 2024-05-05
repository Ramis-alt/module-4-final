import React from 'react'
import { useState } from 'react'


const Footer = ({ handleCreateTask, handleRenameTask, handleUpdateContent, selectedAction }) => {
  // const [selectedAction, setSelectedAction] = useState(null);
  // const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements[0].value; // Extract input value from the form
    switch (selectedAction) {
      case 'rename':
        handleRenameTask(inputValue);
        break;
      case 'update':
        handleUpdateContent(inputValue);
        break;
      default:
        break;
    }
  };


  return (
    <footer className='footer--container--edit'>
      <div className='form--container'>
        <form id='form--edit' className='form--edit' onSubmit={handleSubmit}>
          <label></label>
          <input
            className='input--footer'
            type='text'
            placeholder='Insert text'
          />
        </form>
      </div>
      <div className="button--footer--container">
        <button onClick={handleCreateTask}>Create New Task</button>
        <button type="submit" form="form--edit" className='footer--button'><img className='image--footer--edit' src='./src/images/Submitblue-button.png' /></button>
      </div>
    </footer>
  );
};


export default Footer
