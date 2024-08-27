import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  withCredentials: true, // Ensure cookies are sent with requests if using session authentication
});

// Interceptor to add token to every request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.timeout = 30*60*1000; // 30 minutes
  }
  return config;
});


export const getTasks = async () => {
  try {
    const response = await instance.get('/tasks/');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks', error);
    throw error;
  }
};

export const getTask = async (id: number) => {
  try {
    const response = await instance.get(`/tasks/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching task', error);
    throw error;
  }
};

export const addTask = async (taskData: { title: string; description: string; is_completed: boolean }) => {
  try {
    const response = await instance.post('/tasks/',taskData);
    return response.data;
  } catch (error) {
    console.error('Error adding task', error);
    throw error;
  }
};

export const updateTask = async (id: number, data: { title: string, description: string, is_completed: boolean }) => {
  try {
    const response = await instance.put(`/tasks/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating task', error);
    throw error;
  }
};


export const deleteTask = async (id: number) => {
  try {
    const response = await instance.delete(`/tasks/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting task', error);
    throw error;
  }
};  


export default instance;
