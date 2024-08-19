import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTask } from '../api/axios'
import { useAuth } from '../context/AuthContext';

interface Task {
  id: number;
  title: string;
  description: string;
  is_completed: boolean;
  created: string;
  modified: string;
}

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user && id) {
      const fetchTask = async () => {
        try {
          const taskData = await getTask(id);
          setTask(taskData);
        } catch (error) {
          console.error('Error fetching task details', error);
        }
      };
      fetchTask();
    }
  }, [user, id]);

  if (!task) {
    return <p>Loading task details...</p>;
  }

  return (
    <div>
      <h2>Task Details</h2>
      <p><strong>Title:</strong> {task.title}</p>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Completed:</strong> {task.is_completed ? 'Yes' : 'No'}</p>
      <p><strong>Created Time:</strong> {new Date(task.created).toLocaleString()}</p>
      <p><strong>Modified Time:</strong> {new Date(task.modified).toLocaleString()}</p>
    </div>
  );
};

export default TaskDetails;
