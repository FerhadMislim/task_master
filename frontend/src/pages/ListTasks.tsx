import React, { useEffect, useState } from 'react';
import { getTasks } from '../api/axios';
import { useAuth } from '../context/AuthContext';

interface Task {
  id: number;
  title: string;
  description: string;
  is_completed: boolean;
}

const ListTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
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

  return (
    <div>
      <h2>Tasks</h2>
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

export default ListTasks;
