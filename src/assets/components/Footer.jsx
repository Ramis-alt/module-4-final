import React from 'react'

//the footer will make HTTP requests to the backend and update the data
//it will also rename the sidebar elements


const Footer = () => {
  return (
<footer className='footer--container--edit'>
   <div className='form--container'>
    <form className='form--edit'>
      <label></label>
        <input className='input--footer' type='text' placeholder='search text'></input>
    </form>
   </div>
   <div className="button--footer--container">
    <button className='footer--button'><img className='image--footer--edit' src='./src/images/Submitblue-button.png'/></button>
   </div>

</footer>
  )
}

export default Footer
