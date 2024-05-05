// import { useState, useEffect } from 'react'
import React from 'react'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import MainContent from '../MainContent'
import Footer from '../Footer'
// import { getTasks, createTask, deleteTask, updateTask } from '../../ApiServices/TasksService'
import { getTasks } from '../../../ApiServices/TasksService'
// import { Link } from 'react-router-dom'


const MainPage = () => {

  const [tasks, setTasks] = React.useState([]);
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [selectedAction, setSelectedAction] = React.useState(null);

  React.useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const selectedTaskObj = tasks.find(task => task.id === selectedTask);
  const content = selectedTaskObj ? selectedTaskObj.content : '';
  const title = selectedTaskObj ? selectedTaskObj.title : '';

  const handleCreateTask = async (newContentValue, newDateValue) => {
    try {
      await fetch('/user-new-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newContentValue: newContentValue,
          newDateValue: newDateValue,
        }),
      });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleRenameTask = async (newTitle) => {
    try {
      await fetch(`/update_title/${selectedTask}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTitle,
        }),
      });
    } catch (error) {
      console.error('Error renaming task:', error);
    }
  };

  const handleUpdateContent = async (newContent) => {
    try {
      await fetch(`/update_content/${selectedTask}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newContent,
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
            <Sidebar title={title} setSelectedTask={setSelectedTask} setSelectedAction={setSelectedAction} />
          </div>
          <div className="maincontent--bar">
            <MainContent content={content} />
          </div>
          <div className="footer--bar">
            <Footer
              handleCreateTask={handleCreateTask}
              handleRenameTask={handleRenameTask}
              handleUpdateContent={handleUpdateContent}
              selectedTask={selectedTask}
              selectedAction={selectedAction}
            />
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default MainPage
