import React, { useEffect, useState } from 'react';
import { getTasks } from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

interface Task {
  id: number;
  title: string;
  created: string;
  modified: string;
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
              <th>#</th>
              <th>Title</th>
              <th>Created Time</th>
              <th>Modified Time</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/tasks/${task.id}`}>{task.title}</Link>
                </td>
                <td>{new Date(task.created).toLocaleString()}</td>
                <td>{new Date(task.modified).toLocaleString()}</td>
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
