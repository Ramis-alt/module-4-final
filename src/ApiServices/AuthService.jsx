import { API_URL } from '/src/enviroments';

// Removed the AuthRequestBody interface

export const register = async (body) => { // Removed type annotation
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  return data;
}

export const LogIn = async (body) => { // Removed type annotation
  const response = await fetch(`${API_URL}/log-in`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  return data;
}



//DONE