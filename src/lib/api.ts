import { auth } from './firebase';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const getAuthToken = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not logged in.');
  }
  return await user.getIdToken();
};

const api = {
  get: async (path: string) => {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    return response.json();
  },
  post: async (path: string, data: any) => {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    return response.json();
  },
  put: async (path: string, data: any) => {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    return response.json();
  },
  delete: async (path: string) => {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}${path}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
  },
};

export default api;
