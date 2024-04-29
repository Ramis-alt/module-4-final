// import { useState, useEffect } from 'react'
import React from 'react'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import MainContent from '../MainContent'
import Footer from '../Footer'
// import { Link } from 'react-router-dom'


const MainPage = ({ taskId }) => {

    const handleCreateTask = async () => {
        try {
          await fetch('/user-new-content', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              newContentValue: '', // Set default content value here
              newDateValue: new Date().toISOString(), // Set default date value here
            }),
          });
        } catch (error) {
          console.error('Error creating task:', error);
        }
      };
    
      // Function to rename the title of the task
      const handleRenameTask = async () => {
        try {
          // Make a PUT request to update the title of the task
          await fetch(`/update_title/${taskId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: 'New Title', // Set new title value here
            }),
          });
        } catch (error) {
          console.error('Error renaming task:', error);
        }
      };
    
      // Function to update the content of the task
      const handleUpdateContent = async () => {
        try {
          // Make a PUT request to update the content of the task
          await fetch(`/update_content/${taskId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              content: 'New Content', // Set new content value here
            }),
          });
        } catch (error) {
          console.error('Error updating task content:', error);
        }
      };

  return (
<React.Fragment>
    <section>
        <div className='layout'>
            <div className="navigation--bar">
                <Navbar />
            </div>
            <div className="sidebar--bar">
                <Sidebar />
            </div>
            <div className="maincontent--bar">
                <MainContent />
            </div>
            <div className="footer--bar">
                <Footer 
                    handleCreateTask={handleCreateTask} 
                    handleRenameTask={handleRenameTask} 
                    handleUpdateContent={handleUpdateContent}
                />
            </div>
        </div>
    </section>
</React.Fragment>
  )
}

export default MainPage
