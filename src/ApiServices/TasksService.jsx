import { API_URL } from '../environment';
import { getJwt } from './JwtService';

// all get imported into MainPage.jsx

export const createTask = async (body) => {
  const response = await fetch(`${API_URL}/user_data`, {
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
  const response = await fetch(`${API_URL}/user_data`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getJwt()}`
    }
  });

  const data = await response.json();

  return data;
};

export const deleteTask = async (taskId) => {
  const response = await fetch(`${API_URL}/user_data/${taskId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getJwt()}`
    }
  });

  const data = await response.json();

  return data;
};

export const updateTask = async (body) => {
  const response = await fetch(`${API_URL}/user_data`, {
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
