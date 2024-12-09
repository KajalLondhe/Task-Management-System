import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import '../CSS/Taskform.css'; 
const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: 'pending',
  });

  // Fetch task data by ID if editing
  useEffect(() => {
    if (id) {
      const fetchTaskData = async () => {
        try {
          const { data } = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          setTaskData(data); 
        } catch (err) {
          toast.error('Failed to fetch task data');
        }
      };
      fetchTaskData();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/tasks/update/${id}`, taskData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        toast.success('Task updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/tasks/create', taskData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        toast.success('Task added successfully');
      }
      navigate('/'); // Redirect to task list
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save task');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{id ? 'Edit Task' : 'Add Task'}</h1>
      <div>
        <label style={{color:'black'}}>Title:</label>
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label style={{color:'black'}}>Description:</label>
        <textarea
          name="description"
          value={taskData.description}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label style={{color:'black'}}>Status:</label>
        <select
          name="status"
          value={taskData.status}
          onChange={handleInputChange}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className='button'>
      <button type="submit">Submit</button>
      <button type="button" onClick={() => navigate('/')}>
        Cancel
      </button>
      </div>
    </form>
  );
};

export default TaskForm;
