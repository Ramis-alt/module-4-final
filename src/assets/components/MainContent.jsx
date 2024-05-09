import React from 'react'
import 'popper.js';
import 'bootstrap';

//the content here will update based on the sidebar selection and the backend
const MainContent = ({ content }) => {
  return (
    <main>
      {content ? <p className='content--edit'>{content}</p> : null}
    </main>
  )
}

export default MainContent
