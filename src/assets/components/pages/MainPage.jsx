import React from 'react'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import MainContent from '../MainContent'
import Footer from '../Footer'
import { getTasks, createTask, updateTask, updateTaskTitle } from '../../../ApiServices/TasksService'

const MainPage = () => {
  const [tasks, setTasks] = React.useState([]);
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [selectedAction, setSelectedAction] = React.useState(null);

  React.useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        if (response && Array.isArray(response.userData)) {
          setTasks(response.userData);
        } else {
          console.error('Error fetching tasks: response is not an array', response);
        }
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
      await createTask({ newContentValue, newDateValue });
  
      const response = await getTasks();
      if (response && Array.isArray(response.userData)) {
        setTasks(response.userData);
        // Assume the new task is the last one in the list
        const newTask = response.userData[response.userData.length - 1];
        setSelectedTask(newTask.id);
      } else {
        console.error('Error fetching tasks: response is not an array', response);
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleRenameTask = async (newTitle) => {
    try {
      await updateTaskTitle(newTitle, selectedTask);
      const response = await getTasks();
      if (response && Array.isArray(response.userData)) {
        setTasks(response.userData);
        // Update the selectedTask state to the ID of the newly renamed task
        setSelectedTask(selectedTask);
      } else {
        console.error('Error fetching tasks: response is not an array', response);
      }
    } catch (error) {
      console.error('Error renaming task:', error);
    }
  };
  
  const handleUpdateContent = async (newContent) => {
    try {
      // Fetch the current content of the task
      const currentTask = tasks.find(task => task.id === selectedTask);
      const currentContent = currentTask ? currentTask.content : '';
  
      // Append the new content to the current content
      const combinedContent = `${currentContent}\n${newContent}`;
  
      // Update the task with the combined content
      await updateTask({ content: combinedContent }, selectedTask);
  
      const response = await getTasks();
      if (response && Array.isArray(response.userData)) {
        setTasks(response.userData);
        // Update the selectedTask state to the ID of the updated task
        setSelectedTask(selectedTask);
      } else {
        console.error('Error fetching tasks: response is not an array', response);
      }
    } catch (error) {
      console.error('Error updating task content:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      const response = await getTasks();
      if (response && Array.isArray(response.userData)) {
        setTasks(response.userData);
        // If the deleted task was selected, deselect it
        if (taskId === selectedTask) {
          setSelectedTask(null);
        }
      } else {
        console.error('Error fetching tasks: response is not an array', response);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
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
            <Sidebar title={title} setSelectedTask={setSelectedTask} tasks={tasks} setSelectedAction={setSelectedAction} handleDeleteTask={handleDeleteTask}/>
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
