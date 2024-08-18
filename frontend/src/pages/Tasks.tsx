import React, { useEffect, useState } from 'react';
import { getTasks, addTask } from '../api/axios'; 
import { useAuth } from '../context/AuthContext';

interface Task {
  id: number;
  title: string;
  description: string;
  is_completed: boolean;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const fetchTasks = async () => {
        try {
          const taskData = await getTasks();
          setTasks(taskData);
        } catch (error) {
          console.error('Error fetching tasks', error);
        }
      };
      fetchTasks();
    }
  }, [user]);

  const handleAddTask = async () => {
    try {
      await addTask(newTaskTitle);
      setNewTaskTitle('');
      // Refresh the task list
      const taskData = await getTasks();
      setTasks(taskData);
    } catch (error) {
      console.error('Error adding task', error);
    }
  };

  return (
    <div>
      <h2>Tasks</h2>
      <div>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New task title"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      {tasks.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.is_completed ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
};

export default Tasks;
