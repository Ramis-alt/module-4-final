import React from 'react';
import 'popper.js';
import 'bootstrap';
import DropdownMenu from './DropdownMenu';

const Sidebar = ({ title, setSelectedTask, setSelectedAction, tasks }) => {
  // const [tasks, setTasks] = useState([]);

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     const response = await getTasks();
  //     if (response && Array.isArray(response.userData)) {
  //       setTasks(response.userData);
  //     } else {
  //       console.error('fetchedTasks is not an array:', response);
  //     }
  //   };
  
  //   fetchTasks();
  // }, []);

  return (
    <aside>
      <div className='side--content'>
        {Array.isArray(tasks) && tasks.map((task) => (
          <div className='sidebar--edit' key={task.id} onClick={() => setSelectedTask(task.id)}>
            {task.title ? <h4 className='tasks--edit'>{task.title}</h4> : null}
            <DropdownMenu taskId={task.id} setSelectedAction={setSelectedAction} />
          </div>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar
