import React, { useState } from 'react';
import { addTask } from '../api/axios'; // Import the addTask API call
import { useNavigate } from 'react-router-dom';

const AddTask: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    is_completed: false,
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddTask = async () => {
    try {
      await addTask(formData);
      navigate('/tasks');
    } catch (error) {
      console.error('Error adding task', error);
    }
  };

  return (
    <div>
      <h2>Add New Task</h2>
      <div>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Task title"
        />
      </div>
      <div>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Task description"
        />
      </div>
      <div>
        <label>
          Completed:
          <input
            type="checkbox"
            name="is_completed"
            checked={formData.is_completed}
            onChange={handleChange}
          />
        </label>
      </div>
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default AddTask;
