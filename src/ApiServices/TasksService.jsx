// import { API_URL } from '../environment';
import { API_URL } from '../environments';
import { getJwt } from './JwtService';

// all get imported into MainPage.jsx

export const createTask = async (body) => {
  const response = await fetch(`${API_URL}/user-new-content`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getJwt()}`
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  return data;
};

export const getTasks = async () => {
  const response = await fetch(`${API_URL}/user-content`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getJwt()}`
    }
  });

  const data = await response.json();

  return data;
};

export const deleteTask = async (taskId) => {
  const response = await fetch(`${API_URL}/delete_content/${taskId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getJwt()}`
    }
  });

  const data = await response.json();

  return data;
};

export const updateTask = async (body, taskId) => {
  const response = await fetch(`${API_URL}/update_content/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getJwt()}`
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  return data;
};

export const updateTaskTitle = async (newTitle, taskId) => {
  const response = await fetch(`${API_URL}/update_title/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getJwt()}`
    },
    body: JSON.stringify({ title: newTitle })
  });

  const data = await response.json();

  return data;
};