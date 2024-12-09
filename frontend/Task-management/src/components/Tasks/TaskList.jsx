import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TaskContext } from '../../context/TaskContext';
import { useNavigate } from 'react-router-dom';
import '../CSS/Tasklist.css'; 

const TaskList = () => {
  const { tasks, setTasks } = useContext(TaskContext);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/tasks/list', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTasks(data);
    } catch (err) {
      toast.error('Failed to fetch tasks');
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/remove/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
      toast.success('Task deleted successfully');
    } catch (err) {
      toast.error('Failed to delete task');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) =>
    filter === 'all' ? true : task.status === filter
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{textAlign:"center",marginLeft:'45%'}}>Task List</h1>
        <button onClick={() => navigate('/tasks/new')}>Add Task</button>
     
      </div>
      <div style={{ margin: '10px 0' }}>
        <label htmlFor="statusFilter">Filter by Status:</label>
        <select
          id="statusFilter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>User</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>{task.user?.email || 'Unknown User'}</td>
                <td>
                  <button onClick={() => navigate(`/tasks/edit/${task._id}`)}>Edit</button>
                  <button onClick={() => handleDelete(task._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No tasks available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
