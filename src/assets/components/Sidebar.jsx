import React from 'react';
import 'popper.js';
import 'bootstrap';
import DropdownMenu from './DropdownMenu';

const Sidebar = ({ title, setSelectedTask, setSelectedAction, tasks, handleDeleteTask }) => {
  return (
    <aside>
      <div className='side--content'>
        {Array.isArray(tasks) && tasks.map((task) => (
          <div className='sidebar--edit' key={task.id} onClick={() => setSelectedTask(task.id)}>
            {task.title ? <h4 className='tasks--edit'>{task.title}</h4> : null} 
            <DropdownMenu taskId={task.id} setSelectedAction={setSelectedAction} handleDeleteTask={handleDeleteTask} />
          </div>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar
