import React from 'react'
import { useState } from 'react'


const Footer = ({ handleCreateTask, handleRenameTask, handleUpdateContent, selectedAction }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
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

  const handleCreate = () => {
    const newDateValue = new Date().toISOString(); // Use the current date and time as newDateValue
    handleCreateTask(inputValue, newDateValue);
    setInputValue(''); // Clear the input field
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
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
        </form>
      </div>
      <div className="button--footer--container">
        <button onClick={handleCreate}>Create New Task</button>
        <button type="submit" form="form--edit" className='footer--button'><img className='image--footer--edit' src='./src/images/Submitblue-button.png' /></button>
      </div>
    </footer>
  );
};

export default Footer