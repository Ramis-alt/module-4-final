import React from 'react'
// src/main.js or any other JavaScript file
import 'popper.js';
import 'bootstrap';

//the content here will update based on the sidebar selection and the backend
const MainContent = ({ content }) => {
  return (
    <main>
        {content && <p className='content--edit'>{content}</p>}
    </main>
  )
}

export default MainContent
